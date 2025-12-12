import { Card, CardProps } from '@mui/material';

type CommonCardProps = CardProps;

export const CommonCard = ({ children, ...props }: CommonCardProps) => (
  <Card {...props} sx={{ ...props.sx, marginBottom: 2, padding: 1 }}>
    {children}
  </Card>
);
