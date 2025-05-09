import { alpha } from '@mui/material';
import { theme } from '@/lib/theme.tsx';

export const loginFormStyles = {
  background: alpha(theme.palette.background.default, 0.15),
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.background.default, 0.37)}`,
  backdropFilter: 'blur(.3rem)',
  borderRadius: '0.4rem',
  border: `1px solid ${alpha(theme.palette.background.default, 0.18)}`,
  p: '2rem',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '25rem',
  maxWidth: '50rem',
};

export const loginButtonStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  pt: '2rem',
  fontWeight: 700,
};

export const loginGoBackButtonStyles = {
  color: theme.palette.primary.light,
};
