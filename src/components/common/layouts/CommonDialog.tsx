import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

type CommonDialogProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export const CommonDialog = ({
  title,
  children,
  open,
  onClose,
}: CommonDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);
