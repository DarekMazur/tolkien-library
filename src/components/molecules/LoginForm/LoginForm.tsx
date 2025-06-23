import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Typography } from '@mui/material';
import {
  loginButtonStyles,
  loginFormStyles,
  loginGoBackButtonStyles,
} from '@/components/molecules/LoginForm/LoginForm.styles.ts';
import { useEffect } from 'react';
import Loader from '@/components/atoms/Loader/Loader.tsx';

const LoginForm = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      {!isAuthenticated ? (
        <Loader isLoading isCenter margin={0} isTransparent />
      ) : (
        <Box component="form" role="form" sx={loginFormStyles}>
          <Typography variant="h4">You are already login</Typography>
          <Button
            variant="contained"
            role="button"
            sx={{ p: '1rem', m: '1rem', fontWeight: 700 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Box sx={loginButtonStyles}>
            <Button href="/" role="button" sx={loginGoBackButtonStyles}>
              Go back home
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoginForm;
