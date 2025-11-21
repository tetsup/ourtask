import { NextRequest } from 'next/server';
import { apiGetList } from '@/db/models/server/user';

export const GET = async (req: NextRequest) => {
  return await apiGetList(req);
};
