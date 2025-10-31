import { CircularProgress } from '@mui/material';
import { authClient } from '@/auth/client';
import { CommonButton } from '../common/parts/CommonButton';
import { useLanguage } from '@/i18n/provider';

export const SignInButton = () => {
  const { t } = useLanguage();
  const session = authClient.useSession();
  if (!session.isPending)
    return <CommonButton type="submit">{t.auth.signIn}</CommonButton>;
  else
    return (
      <CommonButton>
        <CircularProgress size="sm" color="inherit" />
      </CommonButton>
    );
};
