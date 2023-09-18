import type { VNCRepeaterOptions } from "./types.js";
import { createEnumLowerCase } from "./utils.js";

export const DefaultServerOptions: VNCRepeaterOptions = {
  serverPort: 5500,
  bufferSize: 250,
  clientPort: 5900,
  logFile: undefined,
  logLevel: "debug",
  noRFB: false,
  logger: undefined,
  socketTimeout: 30 * 60,
  killTimeout: 30,
  keepAlive: 10,
} as const;

export const EventInternal = createEnumLowerCase([
  "NEW_CLIENT",
  "CLOSE_CLIENT",
  "NEW_SERVER",
  "CLOSE_SERVER",
] as const);

export const Event = createEnumLowerCase([
  // Repeater
  "BEFORE_REPEATER_START",
  "AFTER_REPEATER_START",
  "BEFORE_REPEATER_STOP",
  "AFTER_REPEATER_STOP",

  // Repeater - server
  "BEFORE_SERVER_GATEWAY_START",
  "AFTER_SERVER_GATEWAY_START",
  "BEFORE_SERVER_GATEWAY_STOP",
  "AFTER_SERVER_GATEWAY_STOP",

  // Repeater - client
  "BEFORE_CLIENT_GATEWAY_START",
  "AFTER_CLIENT_GATEWAY_START",
  "BEFORE_CLIENT_GATEWAY_STOP",
  "AFTER_CLIENT_GATEWAY_STOP",

  // Server
  "BEFORE_SERVER_CLOSE",
  "AFTER_SERVER_CLOSE",
  "BEFORE_SERVER_NEW",
  "SERVER_NEW_ADDED_TO_PENDING",
  "SERVER_NEW_PREVENT_HOOKUP",
  "SERVER_NEW_HOOKUP",
  "SERVER_NEW_OVERRIDE_OLD",

  // Client
  "BEFORE_CLIENT_NEW",
  "CLIENT_NEW_HOOKUP_DIRECT",
  "BEFORE_CLIENT_CLOSE",
  "AFTER_CLIENT_CLOSE",
  "CLIENT_NEW_ADDED_TO_PENDING",
  "CLIENT_NEW_DIRECT_INVALID_PORT",
  "CLIENT_NEW_DIRECT_INVALID_HOST",
  "CLIENT_NEW_HOOKUP",
  "CLIENT_NEW_PREVENT_HOOKUP",
  "CLIENT_NEW_OVERRIDE_OLD",
] as const);
