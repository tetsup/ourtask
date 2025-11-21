import { auth } from '@/auth/server';
import type { ObjectId } from 'mongodb';

export type User = typeof auth.$Infer.Session.user;

export type UserOutput<T extends string | ObjectId> = {
  _id: T;
} & Omit<User, 'id'>;
