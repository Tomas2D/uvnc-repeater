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
  "REPEATER_REFUSE",
  "REPEATER_LOGFILE",
  "REPEATER_LOG_LEVEL",
] as const);

export async function run() {
  const options: VNCRepeaterOptions = await yargs(hideBin(process.argv))
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
    })
    .parseAsync();

  const client = new UltraVNCRepeater(options);
  await client.start();
  return client;
}
