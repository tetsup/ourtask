import type { ObjectId } from 'mongodb';
import { roleSchema } from '../schemas/project';
import type { UserOutput, UserRef } from './user';

type Role = typeof roleSchema;

type AssignmentOutput<T extends string | ObjectId> = {
  assignee: UserOutput<T>;
  role: Role;
};

export type ProjectOutput<T extends string | ObjectId> = {
  _id: T;
  name: string;
  description: string;
  owners: UserOutput<T>[];
  assignments: AssignmentOutput<T>[];
};

type AssignmentInput<T extends string | ObjectId> = {
  assignee: UserRef<T>;
  role: Role;
};
export type ProjectInput<T extends string | ObjectId> = {
  name: string;
  description: string;
  owners: UserRef<T>[];
  assignments: AssignmentInput<T>[];
};
