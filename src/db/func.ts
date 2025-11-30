import { NextRequest, NextResponse } from 'next/server';
import { getSignInUser } from '@/auth/server';
import { handleError, UnAuthorizedError, UnprocessableError } from './errors';
import { serverSchema } from './rules/server';
import { User } from './types/user';

export type DbExecuteParams<T> = {
  signInUser?: User | null;
  params: T;
  sessionSet: SessionSet;
};

type Authorize<T> = AsyncFunc<DbExecuteParams<T>, void>;

export type ApiParams<T> = {
  req: NextRequest;
  execute: DbExecute<T>;
  schema: SchemaFuncBuilder<any, T>;
  authorize: Authorize<T>;
  sessionSet: SessionSet;
};

export type Api<T> = (params: ApiParams<T>) => Promise<NextResponse>;

export type DbExecute<T> = AsyncFunc<DbExecuteParams<T>, any>;

const readParams = async (req: NextRequest) => {
  try {
    if (req.method === 'GET') {
      const q = req.nextUrl.searchParams.get('q');
      return q ? JSON.parse(q) : {};
    }
    if (req.method === 'POST' || req.method === 'PUT') return await req.json();
  } catch (e: any) {
    throw new UnprocessableError(e);
  }
};

export const api: Api<any> = async ({
  req,
  execute,
  schema,
  authorize,
  sessionSet,
}) =>
  await handleError(async () => {
    const params = await readParams(req);
    const parsedParams =
      await serverSchema(schema)(sessionSet).parseAsync(params);
    const signInUser = await getSignInUser(req);
    await authorize({ signInUser, params: parsedParams, sessionSet });
    const res = await execute({ signInUser, params: parsedParams, sessionSet });
    return NextResponse.json(res, { status: 200 });
  });

export const needLogin: Authorize<any> = async ({ signInUser }) => {
  if (signInUser == null) throw new UnAuthorizedError();
};
