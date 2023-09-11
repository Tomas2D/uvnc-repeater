import type { VNCRepeaterOptions } from "./types.js";

export const DefaultServerOptions: VNCRepeaterOptions = {
  serverPort: 5500,
  bufferSize: 250,
  clientPort: 5900,
  logFile: undefined,
  logLevel: undefined,
  noRFB: false,
  logger: undefined,
  socketTimeout: 30 * 60,
  killTimeout: 30,
} as const;

export const EventInternal = {
  NEW_CLIENT: "new_client",
  CLOSE_CLIENT: "close_client",

  NEW_SERVER: "new_server",
  CLOSE_SERVER: "close_server",
} as const;
