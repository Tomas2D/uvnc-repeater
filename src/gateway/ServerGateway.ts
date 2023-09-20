import type {
  CloseServerConnectionEvent,
  NewClientConnectionEvent,
  TimeoutServerConnectionEvent,
} from "../types.js";
import { Logger } from "../logger.js";
import { Socket } from "node:net";
import { closeSocket } from "../utils.js";
import { BaseGateway, BaseGatewayOptions } from "./BaseGateway.js";
import { EventInternal } from "../constants.js";

export interface ServerGatewayOptions extends BaseGatewayOptions {
  bufferSize: number;
  refuse: boolean;
  socketTimeout: number;
  socketFirstDataTimeout: number;
  keepAlive: number;
}

export class ServerGateway extends BaseGateway {
  constructor(
    protected readonly _options: ServerGatewayOptions,
    logger: Logger,
  ) {
    super(_options, logger);
  }

  protected async _onConnection(socket: Socket): Promise<void> {
    await super._onConnection(socket);
    const logger = this._getSocketLogger(socket);
    logger.debug("new server connecting");

    const { id, buffer } = await this._readHeader(
      socket,
      this._options.bufferSize,
    );
    if (!id) {
      logger.debug(`invalid ID:NNNNN string for new server: ${buffer}`);
      await closeSocket(socket);
      return;
    }

    socket.on("timeout", () => {
      super.emit<TimeoutServerConnectionEvent>(EventInternal.TIMEOUT_SERVER, {
        id,
        socket,
      });
    });
    socket.on("close", () => {
      super.emit<CloseServerConnectionEvent>(EventInternal.CLOSE_SERVER, {
        id,
        socket,
      });
    });
    super.emit<NewClientConnectionEvent>(EventInternal.NEW_SERVER, {
      id,
      socket,
      buffer,
    });
  }
}
