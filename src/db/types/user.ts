import { getSignInUser } from '@/auth/server';
import type { ObjectId } from 'mongodb';

export type User = Exclude<
  Awaited<ReturnType<typeof getSignInUser>>,
  undefined
>;

export type UserOutput<
  T extends string | ObjectId,
  U extends User = User,
> = U extends object ? { _id: T } & Omit<U, '_id'> : undefined;

export type UserRef<T extends string | ObjectId> = { _id: T } & Partial<
  UserOutput<T, User>
>;
