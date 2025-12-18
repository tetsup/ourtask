import { roleSchema } from '../schemas/project';
import type { UserOutput, UserRef } from './user';
import type { IdLike, RefType } from './common';

type Role = typeof roleSchema;

type AssignmentOutput<T extends IdLike> = {
  assignee: UserOutput<T>;
  role: Role;
};

export type ProjectOutput<T extends IdLike> = {
  _id: T;
  name: string;
  description: string;
  owners: UserOutput<T>[];
  assignments: AssignmentOutput<T>[];
};

type AssignmentInput<T extends IdLike> = {
  assignee: UserRef<T>;
  role: Role;
};
export type ProjectInput<T extends IdLike> = {
  name: string;
  description: string;
  owners: UserRef<T>[];
  assignments: AssignmentInput<T>[];
};

export type ProjectRef<T extends IdLike> = RefType<T, ProjectOutput<T>>;
