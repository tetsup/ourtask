import { NextRequest, NextResponse } from 'next/server';
import { Session, User } from 'better-auth';
import { auth } from '@/auth/server';
import { handleError, UnAuthorizedError, UnprocessableError } from './errors';
import { serverRules } from './rules/server';

export type AuthInfo = { session: Session; user: User };

type AuthorizeParams<T> = {
  authInfo: AuthInfo | null;
  params: T;
  sessionSet: SessionSet;
};

type Authorize<T> = AsyncFunc<AuthorizeParams<T>, void>;

export type ApiParams<T> = {
  req: NextRequest;
  execute: DbExecute<T>;
  schema: SchemaFuncBuilder<any, T>;
  authorize: Authorize<T>;
  sessionSet: SessionSet;
};

export type Api<T> = (params: ApiParams<T>) => Promise<NextResponse>;

export type DbExecuteParams<T> = {
  params: T;
  authInfo: AuthInfo | null;
  sessionSet: SessionSet;
};

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
      await schema(serverRules)(sessionSet).parseAsync(params);
    const authInfo = await auth.api.getSession({ headers: req.headers });
    await authorize({ authInfo, params: parsedParams, sessionSet });
    const res = await execute({ params: parsedParams, authInfo, sessionSet });
    return NextResponse.json(res, { status: 200 });
  });

export const needLogin: Authorize<any> = async ({ authInfo }) => {
  if (authInfo == null || authInfo.user == null) throw new UnAuthorizedError();
};
