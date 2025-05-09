import { Box } from '@mui/material';
import LoginForm from '@/components/molecules/LoginForm/LoginForm.tsx';
import { loginPageStyles } from '@/components/pages/LoginPage/LoginPage.styles.ts';

const LoginPage = () => {

  return (
    <Box sx={loginPageStyles}>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
