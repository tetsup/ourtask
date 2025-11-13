import { Backdrop, CircularProgress } from '@mui/material';

type CommonBackdropProps = { open: boolean };

export const CommonBackdrop = ({ open }: CommonBackdropProps) => (
  <Backdrop open={open} sx={{ zIndex: 'calc(infinity)' }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
