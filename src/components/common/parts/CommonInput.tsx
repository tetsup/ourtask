import { TextField, TextFieldProps } from '@mui/material';
import { FieldError } from 'react-hook-form';

type CommonTextFieldProps = TextFieldProps & { errorInfo?: FieldError };
export const CommonTextField = (props: CommonTextFieldProps) => {
  const { errorInfo, ...textFieldProps } = props;
  return (
    <TextField
      slotProps={{ inputLabel: { shrink: true } }}
      fullWidth
      {...textFieldProps}
      error={!!errorInfo}
      helperText={errorInfo?.message ?? textFieldProps.helperText}
      sx={{ ...textFieldProps.sx, marginY: 1 }}
    />
  );
};

export const CommonPasswordField = (props: TextFieldProps) => (
  <CommonTextField {...props} type="password" />
);
