import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { getEnv } from "./env.js";
import { UltraVNCRepeater } from "./UltraVNCRepeater.js";
import { LogLevel } from "./logger.js";
import { VNCRepeaterOptions } from "./types.js";
import { createEnumLowerCase } from "./utils.js";

const EnvName = createEnumLowerCase([
  "REPEATER_CLIENT_PORT",
  "REPEATER_SERVER_PORT",
  "REPEATER_BUFSIZE",
  "REPEATER_NO_RFB",
  "REPEATER_REFUSE_DIRECT_HOOKUP",
  "REPEATER_REFUSE",
  "REPEATER_LOGFILE",
  "REPEATER_LOG_LEVEL",
  "REPEATER_SOCKET_TIMEOUT",
  "REPEATER_SOCKET_KEEPALIVE",
] as const);

export async function run() {
  const options: Partial<VNCRepeaterOptions> = await yargs(
    hideBin(process.argv),
  )
    .options({
      clientPort: {
        describe: `Provide custom client gateway port (or use '${EnvName.REPEATER_CLIENT_PORT}' env)`,
        type: "number",
        default: getEnv(EnvName.REPEATER_CLIENT_PORT, {
          type: "number",
        }),
        demandOption: false,
      },
      serverPort: {
        describe: `Provide custom server gateway port (or use '${EnvName.REPEATER_SERVER_PORT}' env)`,
        type: "number",
        default: getEnv(EnvName.REPEATER_SERVER_PORT, {
          type: "number",
        }),
        demandOption: false,
      },
      bufferSize: {
        describe: `Provide buffer window size (or use '${EnvName.REPEATER_BUFSIZE}' env)`,
        type: "number",
        default: getEnv(EnvName.REPEATER_BUFSIZE, {
          type: "number",
        }),
        demandOption: false,
      },
      noRFB: {
        describe: `Should we send the RFB header (or use '${EnvName.REPEATER_NO_RFB}' env)`,
        type: "boolean",
        default: getEnv(EnvName.REPEATER_NO_RFB, {
          type: "bool",
        }),
        demandOption: false,
      },
      refuse: {
        describe: `Prevent multiple connections to same target (or use '${EnvName.REPEATER_REFUSE}' env)`,
        type: "boolean",
        default: getEnv(EnvName.REPEATER_REFUSE, {
          type: "bool",
        }),
        demandOption: false,
      },
      refuseDirectHookup: {
        describe: `Prevent direct connecting to the target when 'host:port' is sent instead of ID. (or use '${EnvName.REPEATER_REFUSE_DIRECT_HOOKUP}' env)`,
        type: "boolean",
        default: getEnv(EnvName.REPEATER_REFUSE_DIRECT_HOOKUP, {
          type: "bool",
        }),
        demandOption: false,
      },
      logFile: {
        describe: `Provide an absolute path for file logging (or use '${EnvName.REPEATER_LOGFILE}' env)`,
        type: "string",
        default: getEnv(EnvName.REPEATER_LOGFILE, {
          type: "string",
        }),
        demandOption: false,
      },
      logLevel: {
        describe: `Provide custom log level (or use '${EnvName.REPEATER_LOG_LEVEL}' env)`,
        type: "string",
        choices: [
          "info",
          "debug",
          "fatal",
          "warn",
          "trace",
          "error",
          "silent",
        ] as LogLevel[],
        default: getEnv(EnvName.REPEATER_LOG_LEVEL, { type: "string" }),
        demandOption: false,
      },
      socketTimeout: {
        describe: `Provide socket timeout in seconds (or use '${EnvName.REPEATER_SOCKET_TIMEOUT}' env)`,
        type: "number",
        default: getEnv(EnvName.REPEATER_SOCKET_TIMEOUT, {
          type: "number",
        }),
        demandOption: false,
      },
      keepAlive: {
        describe: `Provide keep-alive interval in seconds (or use '${EnvName.REPEATER_SOCKET_KEEPALIVE}' env)`,
        type: "number",
        default: getEnv(EnvName.REPEATER_SOCKET_KEEPALIVE, {
          type: "number",
        }),
        demandOption: false,
      },
    })
    .parseAsync();

  const client = new UltraVNCRepeater(options);
  await client.start();
  return client;
}
