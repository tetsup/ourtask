'use client';
import { createContext, ReactNode, useState } from 'react';
import { generateRandomString } from 'better-auth/crypto';
import { CommonBackdrop } from '@/components/common/parts/CommonBackdrop';

type Execute = () => void | Promise<void>;
type BackdropContext = {
  withBackdrop: (execute: Execute) => () => Promise<void>;
};

const initContext = { withBackdrop: () => async () => {} };
export const backdropContext = createContext<BackdropContext>(initContext);

export const BackdropProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const withBackdrop = (execute: Execute) => async () => {
    const key = generateRandomString(10);
    setKeys((current) => [...current, key]);
    await execute();
    setKeys((current) => current.filter((k) => k !== key));
  };
  return (
    <backdropContext.Provider value={{ withBackdrop }}>
      <CommonBackdrop open={!!keys.length} />
      {children}
    </backdropContext.Provider>
  );
};
