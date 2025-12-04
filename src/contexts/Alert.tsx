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
  addAlert: (params: AlertParams) => void;
};

const initContext = { addAlert: () => {} };

export const alertContext = createContext<AlertContext>(initContext);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<(AlertParams & { key: string })[]>([]);
  const addAlert = (alert: AlertParams) => {
    const key = generateRandomString(10);
    setAlerts((current) => [...current, { ...alert, key }]);
  };
  const handleClose = (key: string) => {
    setAlerts((current) => current.filter((alert) => alert.key !== key));
  };
  return (
    <alertContext.Provider value={{ addAlert }}>
      {alerts.map((alert) => (
        <CommonAlert
          key={alert.key}
          severity={alert.severity}
          handleClose={() => {
            handleClose(alert.key);
          }}
        >
          {alert.message}
        </CommonAlert>
      ))}
      {children}
    </alertContext.Provider>
  );
};
