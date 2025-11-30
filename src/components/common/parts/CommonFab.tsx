import { ReactNode } from 'react';
import { Fab, FabProps, FabPropsSizeOverrides } from '@mui/material';

export type CommonFabProps = FabProps & {
  children: ReactNode;
  align: 'left' | 'right';
  direction: 'horizontal' | 'vertical';
  index: number;
  tooltip?: ReactNode;
};
export const CommonFab = ({
  children,
  align,
  direction,
  index,
  size,
  ...props
}: CommonFabProps) => {
  const margin = size === 'small' ? 20 : size === 'medium' ? 24 : 28;
  const step = margin * 2.5;
  return (
    <Fab
      color="primary"
      aria-label="add"
      size={size ?? 'large'}
      {...props}
      sx={{
        position: 'fixed',
        bottom: margin + (direction === 'vertical' ? index * step : 0),
        [align]: margin + (direction === 'horizontal' ? index * step : 0),
      }}
    >
      {children}
    </Fab>
  );
};
