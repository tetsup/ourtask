import { Fab, FabProps } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import {
  Public as SystemIcon,
  LightMode as LightIcon,
  DarkMode as DarkIcon,
} from '@mui/icons-material';

export const ColorThemeToggle = (props: FabProps) => {
  const { mode, setMode } = useColorScheme();
  const toggle = () => {
    setMode(mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system');
  };
  return (
    <Fab {...props} onClick={toggle}>
      {mode === 'system' ? (
        <SystemIcon />
      ) : mode === 'light' ? (
        <LightIcon />
      ) : (
        <DarkIcon />
      )}
    </Fab>
  );
};
