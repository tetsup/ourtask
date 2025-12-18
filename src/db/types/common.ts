import { ObjectId } from 'mongodb';

export type IdLike = string | ObjectId;

export type WithId<T extends IdLike, U extends object> = {
  _id: T;
} & U;

export type RefType<T extends IdLike, U extends object> = {
  _id: T;
} & Partial<U>;
