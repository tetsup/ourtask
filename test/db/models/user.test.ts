import { ObjectId } from 'mongodb';
import { withSession } from '@/db/setup';
import { UserFactory } from '../../factories/user.factory';

test('insertOne', async () => {
  const user = new UserFactory().build();
  const res = await withSession(({ db }) =>
    db.collection('Users').insertOne(user)
  );
  expect(res.insertedId).toBeInstanceOf(ObjectId);
});
