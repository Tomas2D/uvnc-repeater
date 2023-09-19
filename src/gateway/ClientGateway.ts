import type {
  CloseClientConnectionEvent,
  NewClientConnectionEvent,
  TimeoutClientConnectionEvent,
  VNCRepeaterOptions,
} from "../types.js";
import { Logger } from "../logger.js";
import { Socket } from "node:net";
import util from "node:util";
import { BaseGateway } from "./BaseGateway.js";
import { EventInternal } from "../constants.js";

export class ClientGateway extends BaseGateway {
  constructor(
    protected readonly _options: Pick<
      VNCRepeaterOptions,
      "noRFB" | "bufferSize" | "refuse" | "socketTimeout" | "keepAlive"
    > & {
      port: number;
    },
    logger: Logger,
  ) {
    super(_options, logger);
  }

  protected async _onConnection(socket: Socket): Promise<void> {
    await super._onConnection(socket);
    this._logger.debug("new client connecting");

    if (!this._options.noRFB) {
      this._logger.debug(`sending RFB header`);
      await util.promisify(socket.write.bind(socket))(`RFB 000.000\n`);
    }

    const { id, buffer } = await this._readHeader(
      socket,
      this._options.bufferSize,
    );
    socket.on("timeout", () => {
      super.emit<TimeoutClientConnectionEvent>(EventInternal.TIMEOUT_CLIENT, {
        id,
        socket,
      });
    });
    socket.once("close", () => {
      super.emit<CloseClientConnectionEvent>(EventInternal.CLOSE_CLIENT, {
        id,
        socket,
      });
    });
    super.emit<NewClientConnectionEvent>(EventInternal.NEW_CLIENT, {
      id,
      socket,
      buffer,
    });
  }
}
