import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Session, User } from 'better-auth';
import { auth } from '@/auth/server';
import { handleError, UnAuthorizedError, UnprocessableError } from './errors';
import { serverRule } from './rules/server';

type Schema<Z extends z.ZodType<any>> = (sessionSet: SessionSet) => Z;

export type AuthInfo = { session: Session; user: User };

type PermissionParams<T> = {
  authInfo: AuthInfo | null;
  params: T;
  sessionSet: SessionSet;
};

type Permission<T> = AsyncFunc<PermissionParams<T>, void>;

type ApiParams<Z extends z.ZodType<any>> = {
  req: NextRequest;
  execute: DbExecute<z.infer<Z>>;
  schema: (rule: SchemaRule) => Schema<Z>;
  authorize: Permission<z.infer<Z>>;
  sessionSet: SessionSet;
};

export type Api<Z extends z.ZodType<any>> = (
  params: ApiParams<Z>
) => Promise<NextResponse>;

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

export const api: Api<z.ZodType<any>> = async ({
  req,
  execute,
  schema,
  authorize,
  sessionSet,
}) =>
  await handleError(async () => {
    const params = await readParams(req);
    const parsedParams =
      await schema(serverRule)(sessionSet).parseAsync(params);
    const authInfo = await auth.api.getSession({ headers: req.headers });
    await authorize({ authInfo, params, sessionSet });
    const res = await execute({ params: parsedParams, authInfo, sessionSet });
    return NextResponse.json(res, { status: 200 });
  });

export const needLogin: Permission<any> = async ({ authInfo }) => {
  if (authInfo == null || authInfo.user == null) throw new UnAuthorizedError();
};
