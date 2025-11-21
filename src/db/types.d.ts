type AsyncFunc<T, U> = (args: T) => Promise<U>;

type SessionSet = { db: Db; session: ClientSession };

type ModelParams = { collectionName: string; apiPath: string };

type SchemaParams = {
  modelParams: ModelParams;
  sessionSet: SessionSet;
};

type SchemaRule = {
  existingObjectSchema: z.ZodSchema;
};

type ExistingObject = { _id: ObjectId };
