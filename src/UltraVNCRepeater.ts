import net, { Socket } from "node:net";
import type {
  ActiveConnection,
  CloseClientConnectionEvent,
  CloseServerConnectionEvent,
  ConnectionId,
  ConnectionInfo,
  HookupEvent,
  NewClientConnectionEvent,
  NewClientConnectionInvalid,
  NewConnectionEvent,
  NewServerConnectionEvent,
  PendingConnection,
  VNCRepeaterOptions,
  ActiveConnectionId,
} from "./types.js";
import { DefaultServerOptions, EventInternal, Event } from "./constants.js";
import {
  closeSocket,
  omitValues,
  runSafeAsync,
  safeAsync,
  identity,
  logException,
  extractSocketAddress,
} from "./utils.js";
import { RepeaterError, UnknownSocketError } from "./error.js";
import { createFileLogger, createLogger, Logger } from "./logger.js";
import { ClientGateway } from "./gateway/ClientGateway.js";
import { ServerGateway } from "./gateway/ServerGateway.js";
import { BaseGateway } from "./gateway/BaseGateway.js";
import { randomUUID } from "node:crypto";
import { EventEmitter } from "node:events";
import { Stats } from "./Stats.js";

export class UltraVNCRepeater extends EventEmitter {
  protected client: ClientGateway | null = null;
  protected server: ServerGateway | null = null;

  public readonly _stats = new Stats();

  // Pending connections (either server or client exists, never both)
  protected readonly _pendingConnections = new Map<
    ConnectionId,
    PendingConnection
  >();

  // Active connections (both server and client exists)
  protected readonly _activeConnections = new Map<
    ActiveConnectionId,
    ActiveConnection
  >();

  // Lookup for an active connection by socket
  protected readonly _activeConnectionIdBySocket = new WeakMap<
    Socket,
    ActiveConnectionId
  >();

  // All connections' socket meta-information
  protected readonly _connectionInfoBySocket = new WeakMap<
    Socket,
    ConnectionInfo
  >();

  protected readonly _options: VNCRepeaterOptions;
  protected readonly _logger: Logger;

  constructor(options: Partial<VNCRepeaterOptions> = {}) {
    super();
    this._options = {
      ...omitValues(DefaultServerOptions, undefined),
      ...omitValues(options, undefined),
    };

    if (this._options.logger) {
      this._logger = this._options.logger;
    } else {
      const options = {
        level: this._options.logLevel ?? DefaultServerOptions.logLevel,
      };
      this._logger = this._options.logFile
        ? createFileLogger(this._options.logFile, options)
        : createLogger(options);
    }

    this._logger = this._logger.child(
      {},
      {
        msgPrefix: this._getLoggerPrefix(),
      },
    );
  }

  async start() {
    if (this.client || this.server) {
      throw new RepeaterError(`Gateways are already running!`);
    }

    this.emit(Event.BEFORE_REPEATER_START);
    this._logger.debug(`Starting...`);
    this._stats.start();
    await Promise.all([this._initServerGateway(), this._initClientGateway()]);
    await this._registerCleanups();

    this._logger.info(`Client and Server gateways are listening.`);
    this.emit(Event.AFTER_REPEATER_START);
  }

  async close(force = false) {
    if (!this.client && !this.server) {
      this._logger.warn(`Repeater has not been started!`);
      return;
    }

    this.emit(Event.BEFORE_REPEATER_STOP);
    this._logger.debug(`Closing all connections!`);

    await Promise.allSettled([
      this.client
        ?.close?.()
        .finally(() => this.emit(Event.AFTER_CLIENT_GATEWAY_STOP)),
      this.server
        ?.close?.()
        .finally(() => this.emit(Event.AFTER_SERVER_GATEWAY_STOP)),
      ...Array.from(this._pendingConnections.keys()).map((id) =>
        this._closeAndDeletePendingConnection(id, force),
      ),
      ...Array.from(this._activeConnections.keys()).map((id) =>
        this._closeAndDeleteActiveConnection(id, force),
      ),
    ]);
    this.client = null;
    this.server = null;
    this._logger.info(`Repeater has been closed.`);
    this._stats.stop();
    this.emit(Event.AFTER_REPEATER_STOP);
  }

  getPendingConnections() {
    return new Map(this._pendingConnections);
  }

  getActiveConnections() {
    return Array.from(this._activeConnections.values());
  }

  protected async _closeAndDeletePendingConnection(id: string, force = false) {
    const connection = this._pendingConnections.get(id);
    if (connection) {
      this._pendingConnections.delete(id);
      this._connectionInfoBySocket.delete(
        connection.server || connection.client,
      );

      const { server, client } = connection;
      await Promise.allSettled([
        server && closeSocket(server, force),
        client && closeSocket(client, force),
      ]);
    }
  }

  protected async _onCloseServer(event: Readonly<CloseServerConnectionEvent>) {
    this.emit(Event.BEFORE_SERVER_CLOSE, event);

    const logger = this._getLoggerForSocket(event.socket);
    logger.info(`server has been closed`);

    const pendingConnection = this._pendingConnections.get(event.id);
    const activeConnectionId = this._activeConnectionIdBySocket.get(
      event.socket,
    );
    this._activeConnectionIdBySocket.delete(event.socket);

    await Promise.allSettled([
      pendingConnection?.server === event.socket &&
        this._closeAndDeletePendingConnection(event.id),
      activeConnectionId &&
        this._closeAndDeleteActiveConnection(activeConnectionId),
    ]);
    this.emit(Event.AFTER_SERVER_CLOSE, event);
  }

  async closeConnection(
    conn: Socket | ActiveConnection | PendingConnection,
    force = false,
  ) {
    const socket = conn instanceof Socket ? conn : conn.server || conn.client;
    const connection = this._connectionInfoBySocket.get(socket);
    if (!connection || !connection.id) {
      throw new UnknownSocketError(
        "Provided socket is not associated with any connection!",
      );
    }
    await closeSocket(socket, force);
  }

  getStats() {
    return this._stats.serialize();
  }

  protected async _closeAndDeleteActiveConnection(id: string, force = false) {
    const activeConnection = this._activeConnections.get(id);
    if (activeConnection) {
      const { server, client } = activeConnection;

      this._activeConnections.delete(id);
      this._activeConnectionIdBySocket.delete(client);
      this._activeConnectionIdBySocket.delete(server);

      await Promise.allSettled([
        server && closeSocket(server, force),
        client && closeSocket(client, force),
      ]);
    }
  }

  protected async _onCloseClient(event: Readonly<CloseClientConnectionEvent>) {
    this.emit(Event.BEFORE_CLIENT_CLOSE, event);
    const logger = this._getLoggerForSocket(event.socket);
    logger.info(`client has been closed`);

    if (event.id) {
      const connection = this._pendingConnections.get(event.id);
      if (connection && connection.client === event.socket) {
        // @ts-expect-error (wrong type inference)
        connection.client = null;
      }
    }

    const activeConnectionId = this._activeConnectionIdBySocket.get(
      event.socket,
    );
    this._activeConnectionIdBySocket.delete(event.socket);
    if (activeConnectionId) {
      await this._closeAndDeleteActiveConnection(activeConnectionId);
    }

    this.emit(Event.AFTER_CLIENT_CLOSE, event);
  }

  protected _canHookupConnection(id: ConnectionId) {
    if (this._options.refuse) {
      for (const connection of this._activeConnections.values()) {
        if (id === connection.id) {
          return false;
        }
      }
    }
    return true;
  }

  protected _onNewConnection(event: Readonly<NewConnectionEvent>) {
    this._updateConnectionInfo(event.socket);
  }

  protected _updateConnectionInfo(socket: Socket, id?: ConnectionId) {
    if (!this._connectionInfoBySocket.has(socket)) {
      this._connectionInfoBySocket.set(socket, {});
    }

    const info = this._connectionInfoBySocket.get(socket)!;
    if (!info.address) {
      const address = extractSocketAddress(socket);
      info.address = address ?? undefined;
    }
    if (!info.id && id) {
      info.id = id;
    }
  }

  protected async _onNewServer(event: Readonly<NewServerConnectionEvent>) {
    this.emit(Event.BEFORE_SERVER_NEW, event);
    this._updateConnectionInfo(event.socket, event.id);
    this._stats.logServer();

    const { id, socket: serverSocket, emittedAt: serverConnectedAt } = event;
    const logger = this._getLoggerForSocket(serverSocket);

    if (!this._pendingConnections.has(id)) {
      logger.info(`adding new server`);
      this._pendingConnections.set(id, {
        server: serverSocket,
        serverConnectedAt: new Date(),
        client: null,
        clientConnectedAt: null,
      });
      this.emit(Event.SERVER_NEW_ADDED_TO_PENDING, event);
      return;
    }

    if (!this._canHookupConnection(id)) {
      this.emit(Event.SERVER_NEW_PREVENT_HOOKUP, event);
      logger.info(`refusing extra server`);
      await closeSocket(serverSocket);
      return;
    }

    const connection = this._pendingConnections.get(id)!;
    if (connection.client) {
      logger.info(`hooking up server with existing client`);

      this._pendingConnections.delete(id);
      const activeConnection = this._addActiveConnection(id, {
        server: serverSocket,
        serverConnectedAt,
        client: connection.client,
        clientConnectedAt: connection.clientConnectedAt,
      });
      this.emit<HookupEvent>(Event.SERVER_NEW_HOOKUP, {
        emittedAt: new Date(),
        connection: activeConnection,
      });
      await BaseGateway.hookup(serverSocket, connection.client, id);
      return;
    }

    this.emit(Event.SERVER_NEW_OVERRIDE_OLD, event);
    logger.info(`closing and deleting previous server`);
    runSafeAsync(() => this._closeAndDeletePendingConnection(id));
    logger.info(`storing new server`);
    this._pendingConnections.set(id, {
      server: serverSocket,
      serverConnectedAt,
      client: null,
      clientConnectedAt: null,
    });

    this.emit<NewServerConnectionEvent>(
      Event.SERVER_NEW_ADDED_TO_PENDING,
      event,
    );
  }

  protected _addActiveConnection(
    originalId: string,
    connection: Omit<ActiveConnection, "id" | "establishedAt">,
    addSalt = true,
  ): Readonly<ActiveConnection> {
    if (!connection.client || !connection.server) {
      throw new RepeaterError("Invalid connection!", {
        originalId,
        connection,
      });
    }

    this._stats.logEstablished();
    const newId = addSalt
      ? `${originalId}#${Date.now()}#${randomUUID()}`
      : originalId;

    const activeConnection: ActiveConnection = {
      id: originalId,
      ...connection,
      establishedAt: new Date(),
    };
    this._activeConnections.set(newId, activeConnection);
    this._activeConnectionIdBySocket.set(connection.client, newId);
    this._activeConnectionIdBySocket.set(connection.server, newId);
    return activeConnection;
  }

  protected async _onNewClient(event: Readonly<NewClientConnectionEvent>) {
    this.emit<NewClientConnectionEvent>(Event.BEFORE_CLIENT_NEW, event);
    this._updateConnectionInfo(event.socket, event.id);

    const {
      id,
      buffer,
      socket: clientSocket,
      emittedAt: clientConnectedAt,
    } = event;
    const logger = this._getLoggerForSocket(clientSocket);

    if (!id) {
      this._stats.logDirect();

      const [, host = buffer, _port = DefaultServerOptions.clientPort] =
        buffer.match(/^(.+):(-?\d+)/) || [];
      let port = parseInt(String(_port));

      if (!host) {
        logger.debug(`invalid host specified ("${host}")`);
        this.emit<NewClientConnectionInvalid>(
          Event.CLIENT_NEW_DIRECT_INVALID_HOST,
          event,
        );
        runSafeAsync(() => closeSocket(clientSocket));
        return;
      }
      if (!port || Number.isNaN(port)) {
        logger.debug(`invalid port specified ("${_port}")`);
        this.emit<NewClientConnectionInvalid>(
          Event.CLIENT_NEW_DIRECT_INVALID_PORT,
          event,
        );
        runSafeAsync(() => closeSocket(clientSocket));
        return;
      }

      if (port < 0) {
        const newPort = -port;
        logger.debug(`resetting port from ${port} to ${newPort}.`);
        port = newPort;
      } else if (port < 200) {
        const newPort = port + 5900;
        logger.debug(`resetting port from ${port} to ${newPort}.`);
        port = newPort;
      }

      logger.info(
        `making client connection directly to server host='${host}' port='${port}'.`,
      );

      const id = `${host}:${port}#${randomUUID()}`;
      const directSocket = net.createConnection({
        host,
        port,
      });

      const activeConnection = this._addActiveConnection(
        id,
        {
          client: clientSocket,
          clientConnectedAt: clientConnectedAt,
          server: directSocket,
          serverConnectedAt: new Date(),
        },
        false,
      );
      try {
        this.emit<HookupEvent>(Event.CLIENT_NEW_HOOKUP_DIRECT, {
          emittedAt: new Date(),
          connection: activeConnection,
        });
        await BaseGateway.hookup(directSocket, clientSocket, id);
      } catch {
        await this._closeAndDeleteActiveConnection(id);
      }
      return;
    }

    this._stats.logClient();

    if (!this._pendingConnections.has(id)) {
      this.emit(Event.CLIENT_NEW_ADDED_TO_PENDING, event);
      logger.info(`adding new existing client`);
      this._pendingConnections.set(id, {
        server: null,
        serverConnectedAt: null,
        client: clientSocket,
        clientConnectedAt,
      });
      return;
    }

    const connection = this._pendingConnections.get(id)!;
    if (connection.client) {
      if (!this._canHookupConnection(id)) {
        this.emit(Event.CLIENT_NEW_PREVENT_HOOKUP, event);
        logger.info(`refusing extra client`);
        runSafeAsync(() => closeSocket(clientSocket));
        return;
      }

      this.emit(Event.CLIENT_NEW_OVERRIDE_OLD, event);
      logger.info(`closing and deleting previous client`);

      const connectionToClose = connection.client;
      runSafeAsync(() => closeSocket(connectionToClose));
    }

    logger.info(`storing new client`);
    connection.client = clientSocket;

    if (connection.server) {
      logger.info(`hooking up new client with existing server`);
      this._pendingConnections.delete(id);
      const activeConnection = this._addActiveConnection(id, {
        server: connection.server,
        serverConnectedAt: connection.serverConnectedAt,
        client: clientSocket,
        clientConnectedAt,
      });
      this.emit<HookupEvent>(Event.CLIENT_NEW_HOOKUP, {
        emittedAt: new Date(),
        connection: activeConnection,
      });
      await BaseGateway.hookup(connection.server, clientSocket, id);
    } else {
      this.emit(Event.CLIENT_NEW_ADDED_TO_PENDING, event);
    }
  }

  protected async _initServerGateway() {
    this.emit(Event.BEFORE_SERVER_GATEWAY_START);
    this._logger.debug(`Starting server gateway...`);
    this.server = new ServerGateway(
      {
        refuse: this._options.refuse,
        port: this._options.serverPort,
        bufferSize: this._options.bufferSize,
        socketTimeout: this._options.socketTimeout,
        socketFirstDataTimeout: this._options.socketFirstDataTimeout,
        keepAlive: this._options.keepAlive,
        keepAliveRetries: this._options.keepAliveRetries,
      },
      this._logger,
    );

    this.server.on(
      EventInternal.NEW_CONNECTION,
      safeAsync({
        handler: identity(this._onNewConnection.bind(this)),
        onError: (err, [event]) => {
          const logger = this._getLoggerForSocket(event.socket);
          logException(
            logger,
            err,
            `Unexpected error during new unknown server connection`,
          );
        },
      }),
    );
    this.server.on(
      EventInternal.NEW_SERVER,
      safeAsync({
        handler: identity(this._onNewServer.bind(this)),
        onError: (err, [event]) => {
          const logger = this._getLoggerForSocket(event.socket);
          logException(
            logger,
            err,
            `Unexpected error during new server connection`,
          );
        },
      }),
    );
    this.server.on(
      EventInternal.CLOSE_SERVER,
      safeAsync({
        handler: identity(this._onCloseServer.bind(this)),
        onError: (err, [event]) => {
          const logger = this._getLoggerForSocket(event.socket);
          logException(
            logger,
            err,
            `Unexpected error when closing server connection`,
          );
        },
      }),
    );

    await this.server.start();
    this._logger.debug(
      `Server gateway has been started on port ${this._options.serverPort}`,
    );
    this.emit(Event.AFTER_SERVER_GATEWAY_START);
  }

  protected async _initClientGateway() {
    this.emit(Event.BEFORE_CLIENT_GATEWAY_START);
    this._logger.debug(`Client gateway starting...`);
    this.client = new ClientGateway(
      {
        refuse: this._options.refuse,
        noRFB: this._options.noRFB,
        port: this._options.clientPort,
        bufferSize: this._options.bufferSize,
        socketTimeout: this._options.socketTimeout,
        socketFirstDataTimeout: this._options.socketFirstDataTimeout,
        keepAlive: this._options.keepAlive,
        keepAliveRetries: this._options.keepAliveRetries,
      },
      this._logger,
    );

    this.client.on(
      EventInternal.NEW_CONNECTION,
      safeAsync({
        handler: identity(this._onNewConnection.bind(this)),
        onError: (err, [event]) => {
          const logger = this._getLoggerForSocket(event.socket);
          logException(
            logger,
            err,
            `Unexpected error during new unknown client connection`,
          );
        },
      }),
    );
    this.client.on(
      EventInternal.NEW_CLIENT,
      safeAsync({
        handler: identity(this._onNewClient.bind(this)),
        onError: (err, [event]) => {
          const logger = this._getLoggerForSocket(event.socket);
          logException(
            logger,
            err,
            `Unexpected error during new client connection`,
          );
        },
      }),
    );
    this.client.on(
      EventInternal.CLOSE_CLIENT,
      safeAsync({
        handler: identity(this._onCloseClient.bind(this)),
        onError: (err, [event]) => {
          const logger = this._getLoggerForSocket(event.socket);
          logException(
            logger,
            err,
            `Unexpected error during closing client connection`,
          );
        },
      }),
    );

    await this.client.start();
    this._logger.debug(
      `Client gateway has been started on port ${this._options.clientPort}`,
    );
    this.emit(Event.AFTER_CLIENT_GATEWAY_START);
    return this.client;
  }

  protected async _registerCleanups() {
    let signalForceShutdown = false;
    let timeoutId: NodeJS.Timeout | null = null;
    const cleanup = () => {
      this._logger.warn("Received termination signal.");
      this.close(signalForceShutdown);
      if (signalForceShutdown) {
        this._logger.warn(`Forcing application shutdown`);
        process.exit(0);
      } else if (Number.isFinite(this._options.killTimeout)) {
        this._logger.warn(
          `Forcing server termination in ${this._options.killTimeout} seconds.`,
        );
        timeoutId = setTimeout(
          () => process.exit(0),
          this._options.killTimeout! * 1000,
        );
      }
      signalForceShutdown = true;
    };
    ["SIGINT", "SIGTERM"].forEach((signal) => {
      this.once(Event.AFTER_REPEATER_STOP, () => {
        timeoutId && clearTimeout(timeoutId);
        process.off(signal, cleanup);
      });
      process.on(signal, cleanup);
    });
  }

  protected _getLoggerForSocket(socket?: Socket) {
    if (socket && this._connectionInfoBySocket.has(socket)) {
      const { address, id } = this._connectionInfoBySocket.get(socket)!;
      return this._logger.child(
        {},
        {
          msgPrefix: [address, id]
            .filter(Boolean)
            .map((value) => `[${value}]`)
            .join(""),
        },
      );
    }
    return this._logger;
  }

  protected _getLoggerPrefix() {
    return `[Repeater]`;
  }

  emit<T extends Record<string, any>>(
    eventName: string | symbol,
    body: T | undefined = undefined,
  ): boolean {
    return super.emit(eventName, body);
  }
}
