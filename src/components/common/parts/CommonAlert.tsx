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
  key: string;
  handleClose: () => void;
  children: ReactNode;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
};

export const CommonAlert = ({
  key,
  handleClose,
  severity,
  children,
}: CommonAlertProps) => (
  <Snackbar key={key} open={true} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity} variant="filled">
      {children}
    </Alert>
  </Snackbar>
);
