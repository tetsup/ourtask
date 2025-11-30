import { FabBar, FabBarButtonParams } from '@/components/common/layouts/FabBar';
import { createContext, ReactNode, useContext, useState } from 'react';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  BugReport as BugReportIcon,
} from '@mui/icons-material';
import { useLogging } from './Logging';

type FabMenuContext = {
  setPageMenu: (buttons: FabBarButtonParams[]) => void;
  setAlign: (align: 'left' | 'right') => void;
  setDirection: (direction: 'horizontal' | 'vertical') => void;
};

type FabBarProviderProps = {
  children: ReactNode;
};
const initFabMenuContext: FabMenuContext = {
  setPageMenu: () => {},
  setAlign: () => {},
  setDirection: () => {},
};
const fabMenuContext = createContext(initFabMenuContext);
export const useFabMenuContext = () =>
  useContext<FabMenuContext>(fabMenuContext);

export const FabMenuProvider = ({ children }: FabBarProviderProps) => {
  const { showLog } = useLogging();
  const signedInMenu: FabBarButtonParams[] = [
    {
      key: 'signOut',
      children: <LogoutIcon />,
      tooltip: 'SignOut',
    },
    {
      key: 'userMenu',
      children: <MenuIcon />,
      tooltip: 'User Menu',
    },
    {
      key: 'bugReport',
      children: <BugReportIcon />,
      tooltip: 'Show Debug Log',
      onClick: () => {
        showLog();
      },
    },
  ];
  const [buttons, setButtons] = useState<FabBarButtonParams[]>([
    ...signedInMenu,
  ]);
  const [align, setAlign] = useState<'left' | 'right'>('left');
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    'vertical'
  );
  const setPageMenu = (newButtons: FabBarButtonParams[]) => {
    setButtons([...signedInMenu, ...newButtons]);
  };

  return (
    <fabMenuContext.Provider value={{ setPageMenu, setAlign, setDirection }}>
      <FabBar buttons={buttons} align={align} direction={direction} />
      {children}
    </fabMenuContext.Provider>
  );
};
