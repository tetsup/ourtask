import { MongoClient } from 'mongodb';

const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL!}`;

export const createMongoClient = () => new MongoClient(mongoUri);

export const mongoDatabase = () =>
  createMongoClient().db(process.env.MONGO_DATABASE);
