import { pino } from "pino";

export type Logger = pino.Logger;
export type LogLevel = pino.Level;
export type Options = pino.LoggerOptions;

export function createSilentLogger(): Logger {
  return pino({ level: "silent" });
}

export function createLogger(options: Options): Logger {
  return pino({
    transport: {
      target: "pino-pretty",
    },

    ...options,
  });
}

export function createFileLogger(path: string, options: Options): Logger {
  const destination = pino.destination({
    dest: path,
    sync: false,
  });

  return pino(
    {
      base: null,
      ...options,
    },
    destination,
  );
}
