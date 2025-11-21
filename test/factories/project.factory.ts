type User = {
  _id: string;
  name: string;
  email: string;
};

type Assignment = {
  assignee: User;
  role: string;
};

type PostProject = {
  name: string;
  description: string;
  owners: User[];
  assignments: Assignment[];
};

const initValue: PostProject = {
  name: 'name',
  description: 'description',
  owners: [],
  assignments: [],
};

export class ProjectFactory {
  value: PostProject;
  constructor(value?: any) {
    this.value = { ...initValue, ...value };
  }
  build() {
    return this.value;
  }
  buildDatabase() {
    return {
      ...this.value,
      owners: this.value.owners.map((u) => u._id),
      assignments: this.value.assignments.map((v) => v.assignee._id),
    };
  }
}
