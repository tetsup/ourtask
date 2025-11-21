type AsyncFunc<T, U> = (args: T) => Promise<U>;

type SessionSet = { db: Db; session: ClientSession };

type ModelParams = { collectionName: string; apiPath: string };

type SchemaParams = SessionSet | void;

type SchemaFunc<T extends SchemaParams, U extends any> = T extends void
  ? z.Schema<U>
  : (params: T) => z.Schema<U>;

type SchemaRules<T> = {
  joinUserSchema: SchemaFunc<T, any>;
};

type SchemaFuncBuilder<T extends SchemaParams, U extends any> = (
  schemarules: SchemaRules<T>
) => SchemaFunc<T, U>;
