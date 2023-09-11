import type {
  CloseConnectionEvent,
  NewClientConnectionEvent,
  VNCRepeaterOptions,
} from "../types.js";
import { Logger } from "../logger.js";
import { Socket } from "node:net";
import { closeSocket, safeAsync } from "../utils.js";
import { BaseGateway } from "./BaseGateway.js";
import { EventInternal } from "../constants.js";

export class ServerGateway extends BaseGateway {
  constructor(
    protected readonly _options: Pick<
      VNCRepeaterOptions,
      "bufferSize" | "refuse" | "socketTimeout"
    > & { port: number },
    logger: Logger,
  ) {
    super(_options, logger);
  }

  protected async _onConnection(socket: Socket): Promise<void> {
    await super._onConnection(socket);
    this._logger.debug("new vnc server connecting");

    const { id, buffer } = await this._readHeader(
      socket,
      this._options.bufferSize,
    );
    if (!id) {
      this._logger.debug(`invalid ID:NNNNN string for vnc server: ${buffer}`);
      await closeSocket(socket);
      return;
    }

    super.emit<NewClientConnectionEvent>(EventInternal.NEW_SERVER, {
      id,
      socket,
      buffer,
    });
    socket.once(
      "timeout",
      safeAsync({
        handler: async () => {
          this._logger.info(`vnc server with id:${id} has timed out`);
          await closeSocket(socket, true);
        },
      }),
    );
    socket.on("close", () => {
      super.emit<CloseConnectionEvent>("close_server", { id, socket });
    });
  }
}
