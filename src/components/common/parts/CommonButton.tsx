import { Button, ButtonProps } from '@mui/material';

export const CommonButton = (props: ButtonProps) => (
  <Button
    variant="contained"
    color="primary"
    fullWidth
    {...props}
    sx={{ ...props.sx, marginY: 1 }}
  />
);
