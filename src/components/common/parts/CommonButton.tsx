import { useLanguage } from '@/i18n/provider';
import { Button, ButtonProps, Fab, IconButtonProps } from '@mui/material';

export const CommonButton = (props: ButtonProps) => (
  <Button
    variant="contained"
    color="primary"
    fullWidth
    {...props}
    sx={{ ...props.sx, marginY: 1 }}
  />
);

export const CommonSubmitButton = (props: ButtonProps) => {
  const { t } = useLanguage();
  return (
    <CommonButton {...props} type="submit">
      {t.common.submit}
    </CommonButton>
  );
};

export const CommonIconButton = ({ children, ...props }: IconButtonProps) => (
  <Fab color="secondary" {...props} sx={{ ...props.sx, marginY: 1 }}>
    {children}
  </Fab>
);
