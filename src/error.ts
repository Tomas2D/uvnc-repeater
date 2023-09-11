export class RepeaterError extends Error {
  constructor(
    message: string,
    public readonly meta: Record<string, any> = {},
  ) {
    super(message);
  }
}
