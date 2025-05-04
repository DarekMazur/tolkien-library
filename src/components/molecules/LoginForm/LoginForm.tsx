import { Box, Button } from '@mui/material';
import FormInput from '@/components/atoms/FormInput/FormInput.tsx';
import {
  loginButtonStyles,
  loginFormStyles,
  loginGoBackButtonStyles,
} from '@/components/molecules/LoginForm/LoginForm.styles.ts';
import { useState } from 'react';

interface ILoginFormProps {
  username: string;
  password: string;
}

const initUser = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [user, setUser] = useState<ILoginFormProps>(initUser);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'username' | 'password',
  ) => {
    setUser({ ...user, [type]: e.target.value });
  };

  return (
    <Box component="form" sx={loginFormStyles}>
      <FormInput
        label="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'username')}
      />
      <FormInput
        label="Password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'password')}
      />
      <FormInput label="Email" isRequired />
      <Button variant="contained" sx={{ p: '1rem', m: '1rem', fontWeight: 700 }}>
        Login
      </Button>
      <Box sx={loginButtonStyles}>
        <Button href="/" sx={loginGoBackButtonStyles}>
          Go back home
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
