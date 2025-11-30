import type { ObjectId } from 'mongodb';

export type WithId<T extends string | ObjectId, U extends object> = {
  _id: T;
} & U;
