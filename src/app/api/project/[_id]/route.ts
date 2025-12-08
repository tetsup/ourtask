import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { apiPut } from '@/db/models/project';

type PutParams = {
  params: Promise<{ _id: string }>;
};

export const PUT = async (req: NextRequest, { params }: PutParams) => {
  const { _id } = await params;
  return await apiPut(req, ObjectId.createFromHexString(_id));
};
