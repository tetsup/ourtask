import { getSignInUser } from '@/auth/server';
import type { IdLike, RefType, WithId } from './common';

export type User = Exclude<Awaited<ReturnType<typeof getSignInUser>>, null>;

export type UserOutput<T extends IdLike> = WithId<T, User>;

export type UserRef<T extends IdLike> = RefType<T, UserOutput<T>>;
