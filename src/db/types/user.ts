import { getSignInUser } from '@/auth/server';
import type { ObjectId } from 'mongodb';
import { WithId } from './common';

export type User = Exclude<Awaited<ReturnType<typeof getSignInUser>>, null>;

export type UserOutput<T extends string | ObjectId> = WithId<T, User>;

export type UserRef<T extends string | ObjectId> = WithId<
  T,
  { _id: T } & Partial<UserOutput<T>>
>;
