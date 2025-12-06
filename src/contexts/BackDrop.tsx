'use client';
import { createContext, ReactNode, useState } from 'react';
import { generateRandomString } from 'better-auth/crypto';
import { CommonBackdrop } from '@/components/common/parts/CommonBackdrop';

type Execute<T, U> = (params: T) => U | Promise<U>;
type BackdropContext<T, U> = {
  withBackdrop: (execute: Execute<T, U>) => (params: T) => Promise<U>;
};

const initContext = { withBackdrop: () => async () => {} };
export const backdropContext =
  createContext<BackdropContext<any, any>>(initContext);

export const BackdropProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const withBackdrop =
    <T extends any>(execute: Execute<T, any>) =>
    async (params: T) => {
      const key = generateRandomString(10);
      setKeys((current) => [...current, key]);
      const res = await execute(params);
      setKeys((current) => current.filter((k) => k !== key));
      return res;
    };
  return (
    <backdropContext.Provider value={{ withBackdrop }}>
      <CommonBackdrop open={!!keys.length} />
      {children}
    </backdropContext.Provider>
  );
};
