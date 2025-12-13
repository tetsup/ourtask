import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';

export const FormLayout = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <Paper
      sx={{
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      {children}
    </Paper>
  </Box>
);
