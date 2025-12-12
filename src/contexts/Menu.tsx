import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Menu } from '@mui/material';

type AnchorPosition = { top: number; left: number } | undefined;

type MenuProviderProps = {
  children: ReactNode;
  renderItems: () => ReactNode;
};

type MenuContext = {
  onOpen: MouseEventHandler;
  onClose: () => void;
};

const initContext = {
  onOpen: () => {},
  onClose: () => {},
};

const menuContext = createContext<MenuContext>(initContext);

export const useMenu = () => useContext(menuContext);

export const MenuProvider = ({ children, renderItems }: MenuProviderProps) => {
  const [anchorPosition, setAnchorPosition] = useState<AnchorPosition>();
  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorPosition({ top: event.clientY, left: event.clientX });
  };
  const onClose = () => {
    setAnchorPosition(undefined);
  };

  return (
    <menuContext.Provider value={{ onOpen, onClose }}>
      <Menu
        open={!!anchorPosition}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        {renderItems()}
      </Menu>
      {children}
    </menuContext.Provider>
  );
};
