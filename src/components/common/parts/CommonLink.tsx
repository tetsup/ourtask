import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

type CommonLinkProps = LinkProps & {
  slotProps?: { Typography?: TypographyProps };
  children: ReactNode;
};

export const CommonLink = (props: CommonLinkProps) => {
  const { slotProps, children, ...linkProps } = props;
  return (
    <Link {...linkProps}>
      <Typography
        component="span"
        color="secondary"
        {...slotProps?.Typography}
        sx={{ ...slotProps?.Typography?.sx, textDecoration: 'underline' }}
      >
        {children}
      </Typography>
    </Link>
  );
};
