import { ClientSession, MongoClient } from 'mongodb';
export type AsyncFunc<T, U> = (args: T) => Promise<U>;
const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL!}`;

const hasTransaction = () => !!process.env.MONGO_RS;

const createClient = () => new MongoClient(mongoUri);

export const database = () => createClient().db(process.env.MONGO_DATABASE);

export const collection = (name: string) => database().collection(name);

export const withSession = async (execute: AsyncFunc<ClientSession, any>) =>
  await createClient().withSession(async (session) => await execute(session));

export const withTransaction = async (
  execute: AsyncFunc<ClientSession, any>
) => {
  return await withSession(async (session) => {
    if (hasTransaction())
      return await session.withTransaction(
        async (session) => await execute(session)
      );
    else return await execute(session);
  });
};
