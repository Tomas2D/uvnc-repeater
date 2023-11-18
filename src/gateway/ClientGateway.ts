import type {
  CloseClientConnectionEvent,
  NewClientConnectionEvent,
  TimeoutClientConnectionEvent,
} from "../types.js";
import { Logger } from "../logger.js";
import { Socket } from "node:net";
import util from "node:util";
import { BaseGateway, BaseGatewayOptions } from "./BaseGateway.js";
import { EventInternal } from "../constants.js";

export interface ClientGatewayOptions extends BaseGatewayOptions {
  noRFB: boolean;
  bufferSize: number;
  refuse: boolean;
  socketTimeout: number;
  socketFirstDataTimeout: number;
  keepAlive: number;
}

export class ClientGateway extends BaseGateway {
  constructor(
    public readonly options: ClientGatewayOptions,
    logger: Logger,
  ) {
    super(options, logger);
  }

  protected async _onConnection(socket: Socket): Promise<void> {
    await super._onConnection(socket);

    const logger = this._getSocketLogger(socket);
    logger.debug("new client connecting");

    if (!this.options.noRFB) {
      logger.debug(`sending RFB header`);
      await util.promisify(socket.write.bind(socket))(`RFB 000.000\n`);
    }

    const { id, buffer } = await this._readHeader(
      socket,
      this.options.bufferSize,
    );
    socket.on("timeout", () => {
      super.emit<TimeoutClientConnectionEvent>(EventInternal.TIMEOUT_CLIENT, {
        id,
        socket,
        emittedAt: new Date(),
      });
    });
    socket.once("close", () => {
      super.emit<CloseClientConnectionEvent>(EventInternal.CLOSE_CLIENT, {
        id,
        socket,
        emittedAt: new Date(),
      });
    });
    super.emit<NewClientConnectionEvent>(EventInternal.NEW_CLIENT, {
      id,
      socket,
      buffer,
      emittedAt: new Date(),
    });
  }
}
