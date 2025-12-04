'use client';
import { ReactNode } from 'react';
import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar,
} from '@mui/material';
import type { OverridableStringUnion } from '@mui/types';

type CommonAlertProps = {
  handleClose: () => void;
  children: ReactNode;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
};

export const CommonAlert = ({
  handleClose,
  severity,
  children,
}: CommonAlertProps) => (
  <Snackbar
    open={true}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <Alert onClose={handleClose} severity={severity} variant="filled">
      {children}
    </Alert>
  </Snackbar>
);
