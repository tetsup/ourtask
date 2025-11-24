'use client';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextFieldProps } from '@mui/material';
import { CommonTextField } from './CommonInput';

type CommonMultipleSelectProps = {
  label: string;
  slotProps?: {
    TextField?: TextFieldProps;
  };
} & Omit<AutocompleteProps<any, true, false, false>, 'renderInput'>;

export const CommonMultipleSelect = ({
  label,
  slotProps,
  ...props
}: CommonMultipleSelectProps) => {
  return (
    <Autocomplete
      {...props}
      fullWidth
      multiple
      renderInput={(params) => (
        <CommonTextField {...slotProps?.TextField} {...params} label={label} />
      )}
    />
  );
};
