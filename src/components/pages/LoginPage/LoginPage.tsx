import { Box, Button, TextField } from '@mui/material';
import moriaGate from '@/assets/images/moria.png';
import { theme } from '@/lib/theme.tsx';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `no-repeat center/cover url(${moriaGate})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          background: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(.3rem)',
          borderRadius: '0.4rem',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          p: '2rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          variant="filled"
          label="Username"
          sx={{ m: '1rem', backgroundColor: theme.palette.background.default }}
        >
          User
        </TextField>
        <TextField
          variant="filled"
          label="Passworrd"
          sx={{ m: '1rem', backgroundColor: theme.palette.background.default }}
        >
          Password
        </TextField>
        <Button variant="contained" sx={{ p: '1rem', m: '1rem' }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
