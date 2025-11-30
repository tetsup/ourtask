'use client';
import { CommonDialog } from '@/components/common/layouts/CommonDialog';
import { LogViewer } from '@/components/logging/LogViewer';
import { createContext, ReactNode, useContext, useState } from 'react';

type LoggingProviderProps<T> = {
  onAddedLog?: (newLog: T) => void;
  maxLogs: number;
  children: ReactNode;
};
type LoggingContext<T> = {
  logs: T[];
  addLog: (newLog: T) => void;
  showLog: () => void;
};

const initContext = { logs: [], addLog: () => {}, showLog: () => {} };

const loggingContext = createContext<LoggingContext<any>>(initContext);

export const useLogging = () => useContext(loggingContext);

export const LoggingProvider = <T extends any>({
  onAddedLog,
  maxLogs,
  children,
}: LoggingProviderProps<T>) => {
  const [logs, setLogs] = useState<T[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const addLog = (newLog: T) => {
    onAddedLog && onAddedLog(newLog);
    setLogs((oldLogs) => [...oldLogs, newLog].slice(-maxLogs));
  };
  const showLog = () => {
    setDialogOpen(true);
  };
  return (
    <loggingContext.Provider value={{ logs, addLog, showLog }}>
      <CommonDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title="Debug Logs"
      >
        <LogViewer logs={logs} />
      </CommonDialog>
      {children}
    </loggingContext.Provider>
  );
};
