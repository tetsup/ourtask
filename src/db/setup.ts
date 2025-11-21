import { ClientSession, MongoClient } from 'mongodb';

declare global {
  var __MONGO_URI__: string;
}
const mongoUri = () =>
  global.__MONGO_URI__ ??
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL!}`;

const hasTransaction = () => !!process.env.MONGO_RS;

export const createClient = () => new MongoClient(mongoUri());
export const database = () => createClient().db(process.env.MONGO_DATABASE);

export const withSession = async (execute: AsyncFunc<SessionSet, any>) => {
  const client = createClient();
  const db = client.db(process.env.MONGO_DATABASE);
  return client
    .withSession(async (session) => await execute({ db, session }))
    .then((res) => res)
    .finally(() => {
      client.close();
    });
};

export const withTransaction = async (execute: AsyncFunc<SessionSet, any>) => {
  return await withSession(async ({ db, session }) => {
    if (hasTransaction())
      return await session.withTransaction(
        async (session: ClientSession) => await execute({ db, session })
      );
    else return await execute({ db, session });
  });
};
