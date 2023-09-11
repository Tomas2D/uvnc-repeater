export interface Options<T> {
  fallback?: T | undefined;
  type?: "number" | "bool" | "string";
}

const ProcessorMap = {
  number: (value: unknown): number => Number(value),
  bool: (value: unknown): boolean => String(value).toLowerCase() === "true",
  string: (value: unknown): string => String(value),
} as const;

export function getEnv<T extends string | boolean | number | null>(
  name: string,
  options?: Options<T>,
): T | undefined {
  const value = process.env[name];
  if (value === undefined || !options?.type) {
    return options?.fallback;
  }
  return ProcessorMap[options.type](value) as T;
}
