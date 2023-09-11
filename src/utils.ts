import { Socket } from "net";
import util from "util";

type OmitType<T extends Record<string, any>, L> = {
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

export async function wait(ms: number) {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
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

export function safeAsync<P, T>({
  handler,
  onError,
}: {
  handler: (...args: P[]) => Promise<T>;
  onError?: (e: Error) => void;
}) {
  return async (...args: P[]): Promise<T | void> => {
    return handler(...args).catch((e) =>
      Promise.resolve(onError ? onError(e) : undefined),
    );
  };
}

export function runSafeAsync(fn: () => Promise<unknown>) {
  return safeAsync({ handler: fn })();
}

export const createEnum = <T extends ReadonlyArray<string>>(
  codes: T,
): Readonly<{ [K in T[number]]: K }> => {
  return codes.reduce(
    (acc, key) => {
      acc[key as T[number]] = key;
      return acc;
    },
    {} as { [K in T[number]]: K },
  );
};
