import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/auth/setup';

export const { POST, GET } = toNextJsHandler(auth);
