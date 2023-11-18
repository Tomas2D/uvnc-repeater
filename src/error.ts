export class RepeaterError extends Error {
  constructor(
    message: string,
    public readonly meta: Record<string, any> = {},
  ) {
    super(message);
  }
}

export class InternalRepeaterError extends Error {}

export class UnknownSocketError extends Error {}
