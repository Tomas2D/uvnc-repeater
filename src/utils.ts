import { Socket } from "node:net";
import util from "node:util";
import { InternalRepeaterError } from "./error.js";
import { Logger } from "./logger.js";

export type OmitType<T extends Record<string, any>, L> = {
  [K in keyof T as T[K] extends L ? never : K]: T[K] extends Record<
    string,
    never
  >
    ? OmitType<T[K], L>
    : T[K];
};

export function isObject<T extends Record<string, unknown>>(
  value: unknown,
): value is T {
  return value?.constructor === Object;
}

export function omitValues<T extends Record<string, any>, L>(
  obj: T,
  valueToRemove: L,
): OmitType<T, L> {
  const filteredPairs = Object.entries(obj)
    .filter(([, value]) => value !== valueToRemove)
    .map(([key, value]) => [
      key,
      isObject(value) ? omitValues(value, valueToRemove) : value,
    ]);
  return Object.fromEntries(filteredPairs) as OmitType<T, L>;
}

export function noop() {}

export async function closeSocket(socket: Socket, force = false) {
  const closeFn = async () => {
    if (force) {
      socket.destroy();
    } else {
      return util.promisify(socket.end.bind(socket))();
    }
  };

  await closeFn().catch(noop);
}

function toPromise<T, P extends any[]>(fn: (...args: P) => T | Promise<T>) {
  return async (...args: P): Promise<T> => {
    return fn(...args);
  };
}

export function identity<T>(value: T) {
  return value;
}

export function safeAsync<P extends any[], T>({
  handler,
  onError,
}: {
  handler: (...args: P) => Promise<T> | T;
  onError?: (e: Error, meta: P) => void;
}) {
  return async (...args: P): Promise<T | void> => {
    const asyncFn = toPromise(handler);
    try {
      return await asyncFn(...args);
    } catch (e) {
      return onError ? onError(e as Error, args) : undefined;
    }
  };
}

export function runSafeAsync(fn: () => Promise<unknown>) {
  return safeAsync({ handler: fn })();
}

export const createEnumLowerCase = <T extends ReadonlyArray<string>>(
  codes: T,
): Readonly<{ [K in T[number]]: Lowercase<K> }> => {
  return codes.reduce(
    (acc, key) => {
      acc[key as T[number]] = key.toLowerCase() as Lowercase<typeof key>;
      return acc;
    },
    {} as { [K in T[number]]: Lowercase<K> },
  );
};

export function logException(
  logger: Logger,
  err: Error,
  message = `Unexpected error has occurred`,
) {
  if (err instanceof InternalRepeaterError) {
    logger.warn(err.message ?? message);
  } else {
    logger.error(err, message);
  }
}
