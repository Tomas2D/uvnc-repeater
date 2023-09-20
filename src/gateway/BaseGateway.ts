import net, { Server, Socket } from "node:net";
import { EventEmitter } from "node:events";
import { Logger } from "../logger.js";
import { ConnectionId, NewConnection } from "../types.js";
import { InternalRepeaterError, RepeaterError } from "../error.js";
import { closeSocket, identity, logException, safeAsync } from "../utils.js";
import util from "node:util";
import { setKeepAliveInterval, setKeepAliveProbes } from "net-keepalive";
import { setInterval, setTimeout } from "node:timers/promises";
import { EventInternal } from "../constants.js";

export interface BaseGatewayOptions {
  keepAlive: number;
  socketTimeout: number;
  socketFirstDataTimeout: number;
  port: number;
}

export abstract class BaseGateway extends EventEmitter {
  protected _server: Server | null = null;
  protected _logger: Logger;

  protected constructor(
    protected readonly _options: BaseGatewayOptions,
    logger: Logger,
  ) {
    super();
    this._logger = logger.child({}, { msgPrefix: this._getLoggerPrefix() });
  }

  async start() {
    if (this._server) {
      this._logger.warn(`Server is already running.`);
      return;
    }

    this._server = net.createServer(
      {
        keepAlive: Boolean(this._options.keepAlive),
        allowHalfOpen: false,
        pauseOnConnect: false,
      },
      safeAsync({
        handler: identity(this._onConnection.bind(this)),
        onError: (err) => {
          logException(
            this._logger,
            err,
            `Unexpected error during connection processing`,
          );
        },
      }),
    );

    await new Promise<void>((resolve) => {
      if (!this._server) {
        return resolve();
      }
      this._server.listen(this._options.port, resolve);
    });
  }

  async close() {
    if (!this._server) {
      this._logger.warn(`Server has not been even started!`);
      return;
    }
    await util.promisify(this._server.close.bind(this._server))();
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
      setTimeout(this._options.socketFirstDataTimeout * 1000, null),
    ]);
    if (!buffer) {
      await closeSocket(socket, true);
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

  static async hookup(a: Socket, b: Socket, id: ConnectionId) {
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

      a.pipe(b).on("error", throwError).on("end", resolve);
      b.pipe(a).on("error", throwError).on("end", resolve);
    });
  }

  protected async _onConnection(socket: Socket) {
    const logger = this._getSocketLogger(socket);

    if (this._options.socketTimeout) {
      logger.debug(
        `setting new connection timeout to ${this._options.socketTimeout} seconds.`,
      );
      socket.setTimeout(this._options.socketTimeout * 1000);
    }
    if (this._options.keepAlive) {
      socket.setKeepAlive(true, this._options.keepAlive * 1000);
      setKeepAliveInterval(socket, this._options.keepAlive * 1000);
      setKeepAliveProbes(socket, 1);
    }
    socket.on("error", (e) => {
      if (e && "code" in e && e.code === "ECONNRESET") {
        logger.warn(
          `An ECONNRESET error occurred due to an unexpected connection reset`,
        );
      }
      closeSocket(socket, true);
    });
    socket.on("timeout", () => {
      closeSocket(socket, true);
    });
    this.emit<NewConnection>(EventInternal.NEW_CONNECTION, { socket });
  }

  protected _getSocketLogger(socket: Socket) {
    const address = socket.remoteAddress;
    if (!address) {
      return this._logger;
    }

    return this._logger.child(
      {},
      {
        msgPrefix: `[${socket.remoteAddress}]`,
      },
    );
  }

  emit<T extends Record<string, any>>(
    eventName: string | symbol,
    body: T,
  ): boolean {
    return super.emit(eventName, body);
  }
}
