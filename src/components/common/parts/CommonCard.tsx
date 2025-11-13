import { Card, CardProps } from '@mui/material';

type CommonCardProps = CardProps;

export const CommonCard = ({ children, ...props }: CommonCardProps) => (
  <Card {...props}>{children}</Card>
);
