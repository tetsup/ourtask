import { ObjectId } from 'mongodb';
import { withSession } from '@/db/setup';

type PostUser = {
  name: string;
  email: string;
};

const generateUserParams = () => {
  const name = Math.random().toString(32).substring(2);
  return { name, email: `${name}@example.com` };
};

export class UserFactory {
  value: PostUser;
  constructor(value?: any) {
    this.value = { ...generateUserParams(), ...value };
  }
  build() {
    return this.value;
  }
}

const createUserInDb = async (params?: any) => {
  const user = new UserFactory(params).build();
  const { insertedId: userId } = await withSession(({ db }) =>
    db.collection('Users').insertOne(user)
  );
  return userId;
};

export const createDummyUsersInDb = async (count: number) => {
  const userIds = [...Array(count)].map(() => new ObjectId());
  await Promise.all(userIds.map((_id) => createUserInDb({ _id })));
  return userIds;
};
