type AsyncFunc<T, U> = (args: T) => Promise<U>;

type SessionSet = { db: Db; session: ClientSession };

type ModelParams = { collectionName: string; apiPath: string };

type SchemaParams = { sessionSet: SessionSet } | {};

type SchemaFunc<T extends SchemaParams, U extends any> = (
  params: T
) => z.Schema<U>;

type SchemaRule<T extends SchemaParams> = (params: T) => z.Schema;

type SchemaRules<T> = {
  joinUserSchema: SchemaRule<T>;
};

type SchemaFuncBuilder<T extends SchemaParams, U extends any> = (
  schemarules: SchemaRules<T>
) => SchemaFunc<T, U>;

type ExistingObject = { _id: ObjectId };
