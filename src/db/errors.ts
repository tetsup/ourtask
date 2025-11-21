import { NextResponse } from 'next/server';
import { z } from 'zod';

class ApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string, errorOptions?: ErrorOptions) {
    super(message, errorOptions);
    this.status = status;
  }
  toResponse() {
    const { status, message, cause, name, stack } = this;
    return NextResponse.json({ message, cause, name, stack }, { status });
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, errorOptions?: ErrorOptions) {
    super(400, message, errorOptions);
  }
}

export class UnAuthorizedError extends ApiError {
  constructor(errorOptions?: ErrorOptions) {
    super(401, 'login required', errorOptions);
  }
}

export class ForbiddenError extends ApiError {
  constructor(errorOptions?: ErrorOptions) {
    super(403, 'access denied', errorOptions);
  }
}

export class NotFoundError extends ApiError {
  constructor(errorOptions?: ErrorOptions) {
    super(404, 'not found', errorOptions);
  }
}

export class UnprocessableError extends ApiError {
  constructor({ message, cause }: z.ZodError) {
    super(422, message, { cause });
  }
}

export class InternalServerError extends ApiError {
  constructor(e?: unknown) {
    super(500, 'unexpected error', { cause: e });
  }
}

export const handleError = async (
  func: AsyncFunc<void, NextResponse>
): Promise<NextResponse> => {
  try {
    return await func();
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof ApiError) return e.toResponse();
    else if (e instanceof z.ZodError)
      return new UnprocessableError(e).toResponse();
    else return new InternalServerError(e).toResponse();
  }
};
