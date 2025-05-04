import { TextField } from '@mui/material';
import { formInputStyles } from '@/components/atoms/FormInput/FormInput.styles.ts';

interface IInputProps {
  id?: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ id, label, type, isRequired, isDisabled, onChange }: IInputProps) => {
  return (
    <TextField
      id={id}
      variant="filled"
      label={label}
      sx={formInputStyles}
      type={type}
      required={isRequired}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
};

export default FormInput;
