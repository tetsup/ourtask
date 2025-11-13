'use client';
import { createContext, ReactNode, useState } from 'react';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material';
import type { OverridableStringUnion } from '@mui/types';
import { generateRandomString } from 'better-auth/crypto';
import { CommonAlert } from '@/components/common/parts/CommonAlert';

type AlertParams = {
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  message: ReactNode | string;
};
type AlertContext = {
  add: (params: AlertParams) => void;
};

const initContext = { add: () => {} };

export const alertContext = createContext<AlertContext>(initContext);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<(AlertParams & { key: string })[]>([]);
  const add = (alert: AlertParams) => {
    const key = generateRandomString(10);
    setAlerts((current) => [...current, { ...alert, key }]);
  };
  const handleClose = (key: string) => {
    setAlerts((current) => current.filter((alert) => alert.key !== key));
  };
  return (
    <alertContext.Provider value={{ add }}>
      {alerts.map((alert) => (
        <CommonAlert
          handleClose={() => {
            handleClose(alert.key);
          }}
          {...alert}
        >
          {alert.message}
        </CommonAlert>
      ))}
      {children}
    </alertContext.Provider>
  );
};
