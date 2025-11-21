import { NextRequest } from 'next/server';
import { apiGetList, apiPost } from '@/db/models/server/project';

export const GET = async (req: NextRequest) => {
  return await apiGetList(req);
};
export const POST = async (req: NextRequest) => {
  return await apiPost(req);
};
