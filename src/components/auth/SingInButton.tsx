import { CircularProgress } from '@mui/material';
import { authClient } from '@/auth/client';
import { CommonButton } from '../common/parts/CommonButton';

export const SignInButton = () => {
  const session = authClient.useSession();
  if (!session.isPending)
    return <CommonButton type="submit">Login</CommonButton>;
  else
    return (
      <CommonButton>
        <CircularProgress size="sm" color="inherit" />
      </CommonButton>
    );
};
