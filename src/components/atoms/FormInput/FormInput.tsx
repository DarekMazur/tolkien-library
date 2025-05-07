import { IconButton, TextField, Box, InputAdornment } from '@mui/material';
import {
  formInputStyles,
  formInputWrapperStyles,
} from '@/components/atoms/FormInput/FormInput.styles.ts';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface IInputProps {
  id?: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ id, label, type, isRequired, isDisabled, onChange }: IInputProps) => {
  const [isHidden, setIsHidden] = useState(type === 'password');

  return (
    <Box sx={formInputWrapperStyles}>
      <TextField
        id={id}
        variant="filled"
        label={label}
        sx={formInputStyles}
        type={type === 'password' ? (isHidden ? 'password' : 'text') : (type ?? 'text')}
        required={isRequired}
        disabled={isDisabled}
        onChange={onChange}
        InputProps={{
          endAdornment: type === 'password' && (
            <InputAdornment position="end">
              {isHidden ? (
                <IconButton onClick={() => setIsHidden(false)}>
                  <VisibilityIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => setIsHidden(true)}>
                  <VisibilityOffIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default FormInput;
