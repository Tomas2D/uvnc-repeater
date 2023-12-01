import net, { Server, Socket } from "node:net";
import { EventEmitter } from "node:events";
import { Logger } from "../logger.js";
import { ConnectionId, NewConnection } from "../types.js";
import { InternalRepeaterError, RepeaterError } from "../error.js";
import {
  closeSocket,
  extractSocketAddress,
  identity,
  logException,
  safeAsync,
} from "../utils.js";
import util from "node:util";
import {
  setKeepAliveInterval,
  setKeepAliveProbes,
  setUserTimeout,
} from "net-keepalive";
import { setInterval, setTimeout } from "node:timers/promises";
import { EventInternal } from "../constants.js";

export interface BaseGatewayOptions {
  keepAlive: number;
  keepAliveRetries: number;
  socketTimeout: number;
  socketFirstDataTimeout: number;
  port: number;
  hostname?: string;
  closeSocketTimeout: number;
}

export abstract class BaseGateway extends EventEmitter {
  server: Server | null = null;
  protected _logger: Logger;

  protected constructor(
    public readonly options: BaseGatewayOptions,
    logger: Logger,
  ) {
    super();
    this._logger = logger.child({}, { msgPrefix: this._getLoggerPrefix() });
  }

  async start() {
    if (this.server) {
      this._logger.warn(`Server is already running.`);
      return;
    }

    this.server = net.createServer(
      {
        allowHalfOpen: false,
        pauseOnConnect: false,
      },
      safeAsync({
        handler: identity(this._onConnection.bind(this)),
        onError: (err, [socket]) => {
          const logger = this._getSocketLogger(socket);
          logException(
            logger,
            err,
            `Unexpected error during connection processing`,
          );
          this._closeSocket(socket);
        },
      }),
    );

    await new Promise<void>((resolve) => {
      if (!this.server) {
        return resolve();
      }
      this.server.listen(this.options.port, this.options.hostname, resolve);
    });
  }

  async close() {
    if (!this.server) {
      this._logger.warn(`Server has not been even started!`);
      return;
    }
    await util.promisify(this.server.close.bind(this.server))();
  }

  protected _getLoggerPrefix() {
    return `[${this.constructor.name}]`;
  }

  protected async _waitForData(socket: Socket, size: number): Promise<string> {
    const logger = this._getSocketLogger(socket);
    if (!socket.readable) {
      logger.warn("Socket is not readable!", { socket, size });
      return "";
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of setInterval(100)) {
      const response: Buffer | null = socket.read(size);
      if (response && response.length >= size) {
        return response.toString();
      }
    }

    return "";
  }

  protected async _readHeader(socket: Socket, size: number) {
    const logger = this._getSocketLogger(socket);
    logger.debug(`reading ${size}B from the socket`);

    let buffer = await Promise.race([
      this._waitForData(socket, size),
      setTimeout(this.options.socketFirstDataTimeout * 1000, null),
    ]);
    if (!buffer) {
      await this._closeSocket(socket);
      throw new InternalRepeaterError(
        `Failed to receive enough data from the socket!`,
      );
    }

    const idx = buffer.indexOf("\0");
    if (idx >= 0) {
      buffer = buffer.substring(0, idx);
    }
    buffer = buffer.replace(/\s*$/, "");

    const [, id] = buffer.match(/^ID:(\w+)/) || [];

    return {
      id: id as string | undefined,
      buffer,
    };
  }

  static async hookup(server: Socket, client: Socket, id: ConnectionId) {
    await new Promise<void>((resolve, reject) => {
      const throwError = (originalError: Error) => {
        const error = new RepeaterError(
          `Error has occurred during connection hookup (ID:${id})`,
          {
            originalError,
          },
        );
        reject(error);
      };

      server.pipe(client).once("error", throwError).once("close", resolve);
      client.pipe(server).once("error", throwError).once("close", resolve);
    });
  }

  protected async _onConnection(socket: Socket) {
    const logger = this._getSocketLogger(socket);

    if (this.options.socketTimeout) {
      logger.debug(
        `setting new connection timeout to ${this.options.socketTimeout} seconds.`,
      );
      socket.setTimeout(this.options.socketTimeout * 1000);
    }
    if (this.options.keepAlive) {
      logger.debug("setting keep-alive properties");
      socket.setKeepAlive(true, this.options.keepAlive * 1000);
      setKeepAliveInterval(socket, this.options.keepAlive * 1000);
      setUserTimeout(socket, this.options.keepAlive * 1000);
      setKeepAliveProbes(socket, Math.max(this.options.keepAliveRetries, 1));
    }
    socket.on("error", (e) => {
      const errCode = e && "code" in e && e.code;
      switch (errCode) {
        case "ECONNRESET":
          logger.warn(
            `An ECONNRESET error occurred due to an unexpected connection reset`,
          );
          break;
        case "ETIMEDOUT":
          logger.warn(`socket connection has timed out`);
          break;
        default:
          logger.warn(`error on the socket has occurred (${e.message})`);
          break;
      }
      this._closeSocket(socket);
    });
    socket.on("timeout", () => {
      logger.debug("socket connection has timed out");
      this._closeSocket(socket);
    });
    this.emit<NewConnection>(EventInternal.NEW_CONNECTION, {
      socket,
      createdAt: new Date(),
    });
  }

  protected _getSocketLogger(socket: Socket) {
    const address = extractSocketAddress(socket);
    if (!address) {
      return this._logger;
    }
    return this._logger.child(
      {},
      {
        msgPrefix: `[${address}]`,
      },
    );
  }

  protected async _closeSocket(socket: Socket) {
    await closeSocket(socket, this.options.closeSocketTimeout);
  }

  emit<T extends Record<string, any>>(
    eventName: string | symbol,
    body: T,
  ): boolean {
    return super.emit(eventName, body);
  }
}
