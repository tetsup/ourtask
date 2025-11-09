import { ClientSession } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Session, User } from 'better-auth';
import { auth } from '@/auth/server';
import { collection } from './setup';

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
class BadRequestError extends ApiError {
  constructor(message: string, errorOptions?: ErrorOptions) {
    super(400, message, errorOptions);
  }
}
class UnAuthorizedError extends ApiError {
  constructor(errorOptions?: ErrorOptions) {
    super(401, 'login required', errorOptions);
  }
}
class ForbiddenError extends ApiError {
  constructor(errorOptions?: ErrorOptions) {
    super(403, 'access denied', errorOptions);
  }
}
class NotFoundError extends ApiError {
  constructor(errorOptions?: ErrorOptions) {
    super(404, 'not found', errorOptions);
  }
}
class UnprocessableError extends ApiError {
  constructor({ message, cause }: z.ZodError) {
    super(422, message, { cause });
  }
}
class InternalServerError extends ApiError {
  constructor(e?: unknown) {
    super(500, 'unexpected error', { cause: e });
  }
}
export type Validation<T> = {
  schema: z.ZodType<T>;
  schemaAsync: (session?: ClientSession) => z.ZodType<T>;
  permission: Permission<T>;
};

type AsyncFunc<T, U> = (args: T) => Promise<U>;

type AuthInfo = { session: Session; user: User };

type PermissionParams<T> = {
  authInfo: AuthInfo | null;
  params: T;
  session?: ClientSession;
};

type Permission<T> = AsyncFunc<PermissionParams<T>, void>;

type ApiParams<T> = {
  req: NextRequest;
  execute: DbExecute<T>;
  validation: Validation<T>;
  session?: ClientSession;
};

type DbExecuteParams<T> = {
  params: T;
  authInfo: AuthInfo | null;
  session?: ClientSession;
};

type DbExecute<T> = AsyncFunc<DbExecuteParams<T>, any>;

const readParams = async (req: NextRequest) => {
  return await req.json();
};

const handleError = async (
  func: AsyncFunc<void, NextResponse>
): Promise<NextResponse> => {
  try {
    return await func();
  } catch (e: unknown) {
    if (e instanceof ApiError) return e.toResponse();
    else if (e instanceof z.ZodError)
      return new UnprocessableError(e).toResponse();
    else return new InternalServerError(e).toResponse();
  }
};

export const api = async ({
  req,
  execute,
  validation: { schema, schemaAsync, permission },
  session,
}: ApiParams<any>) =>
  await handleError(async () => {
    const params = await readParams(req);
    const parsedParams = schema.parse(params);
    const authInfo = await auth.api.getSession({ headers: req.headers });
    await permission({ authInfo, params, session });
    await schemaAsync(session).parseAsync(parsedParams);
    const res = await execute({ params: parsedParams, authInfo, session });
    return NextResponse.json(res, { status: 200 });
  });

export const needLogin: Permission<any> = async ({ authInfo }) => {
  if (authInfo == null || authInfo.user == null) throw new UnAuthorizedError();
};

export const simpleInsertOne =
  (collectionName: string): DbExecute<any> =>
  async ({ params: { data }, session }) =>
    await collection(collectionName).insertOne(data, { session });

export const simpleUpdateOne =
  (collectionName: string): DbExecute<any> =>
  async ({ params: { data }, session }) =>
    await collection(collectionName).updateOne({ _id: data._id }, data, {
      session,
    });

export const simpleDeleteOne =
  (collectionName: string): DbExecute<any> =>
  async ({ params: { _id }, session }) =>
    await collection(collectionName).deleteOne({ _id }, { session });
