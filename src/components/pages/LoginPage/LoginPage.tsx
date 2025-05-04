import { alpha, Box, Button, TextField } from '@mui/material';
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
          background: alpha(theme.palette.background.default, 0.15),
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.background.default, 0.37)}`,
          backdropFilter: 'blur(.3rem)',
          borderRadius: '0.4rem',
          border: `1px solid ${alpha(theme.palette.background.default, 0.18)}`,
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
        <Button variant="contained" sx={{ p: '1rem', m: '1rem', fontWeight: 700 }}>
          Login
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: '2rem', fontWeight: 700 }}>
          <Button href="/" sx={{ color: theme.palette.primary.light }}>
            Go back home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
