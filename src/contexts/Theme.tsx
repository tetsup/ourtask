'use client';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

import type { CssVarsThemeOptions } from '@mui/material/styles';

export const colors: CssVarsThemeOptions['colorSchemes'] = {
  light: {
    palette: {
      action: {
        activatedOpacity: 0.38, // Reduced from 0.54
        selectedOpacity: 0.06, // Reduced from 0.08
        disabledOpacity: 0.2, // Reduced from 0.38
        focusOpacity: 0.08, // Reduced from 0.12
      },
      primary: {
        main: '#000',
      },
      secondary: {
        main: 'rgb(229, 229, 234)', // systemGray
      },
      success: {
        main: 'rgb(52, 199, 89)', // green
      },
      error: {
        main: 'rgb(255, 56, 60)', // red
      },
      warning: {
        main: 'rgb(255, 204, 0)', // yellow
      },
      info: {
        main: 'rgb(0, 136, 255)', // blue
      },
      background: {
        default: 'rgb(192, 192, 192)',
        paper: 'rgb(255, 255, 255)',
      },
    },
  },
  dark: {
    palette: {
      action: {
        activatedOpacity: 0.38, // Reduced intensity
        selectedOpacity: 0.06, // Subtle selection
        disabledOpacity: 0.2, // Reduced opacity
        focusOpacity: 0.08, // Subtle focus
      },
      primary: {
        main: '#fff',
      },
      secondary: {
        main: 'rgb(142, 142, 147)', // systemGray
      },
      success: {
        main: 'rgb(48, 209, 88)', // green for dark
      },
      error: {
        main: 'rgb(255, 69, 58)', // red for dark
      },
      warning: {
        main: 'rgb(255, 214, 10)', // yellow for dark
      },
      info: {
        main: 'rgb(0, 145, 255)', // blue for dark
      },
      background: {
        default: 'rgb(0, 0, 0)', // systemGrayDark
        paper: 'rgb(36, 36, 36)', // systemGrayDark
      },
    },
  },
};

const defaultTheme = createTheme({});
const { pxToRem } = defaultTheme.typography;
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
    cssVarPrefix: 'plus',
  },
  colorSchemes: colors,
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontSize: 10,
    h1: { fontSize: pxToRem(48) },
    h2: { fontSize: pxToRem(36) },
    h3: { fontSize: pxToRem(24) },
    h4: { fontSize: pxToRem(20) },
    h5: { fontSize: pxToRem(18) },
    h6: { fontSize: pxToRem(14) },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
