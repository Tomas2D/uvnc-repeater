import { VNCRepeaterOptions } from "../types.js";
import { Logger } from "../logger.js";
import { Socket } from "node:net";
import util from "node:util";
import { BaseGateway } from "./BaseGateway.js";
import { closeSocket, safeAsync } from "../utils.js";
import { EventInternal } from "../constants.js";

export class ClientGateway extends BaseGateway {
  constructor(
    protected readonly _options: Pick<
      VNCRepeaterOptions,
      "noRFB" | "bufferSize" | "refuse" | "socketTimeout"
    > & {
      port: number;
    },
    logger: Logger,
  ) {
    super(_options, logger);
  }

  protected async _onConnection(socket: Socket): Promise<void> {
    await super._onConnection(socket);
    this._logger.debug("new client connecting.");

    if (this._options.noRFB) {
      this._logger.info("not sending RFB 000.000");
    } else {
      await util.promisify(socket.write.bind(socket))(`RFB 000.000\n`);
    }

    const { id, buffer } = await this._readHeader(
      socket,
      this._options.bufferSize,
    );
    super.emit(EventInternal.NEW_CLIENT, { id, socket, buffer });
    socket.once(
      "timeout",
      safeAsync({
        handler: async () => {
          this._logger.info(`client with id:${id} has timed out`);
          await closeSocket(socket, true);
        },
      }),
    );
    socket.once("close", () => {
      super.emit(EventInternal.CLOSE_CLIENT, { id, socket });
    });
  }
}
