import { theme } from '@/lib/theme.tsx';
import fangorn from '@/assets/images/forest.webp';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const notFoundWrapperStyles = {
  width: '100%',
  backgroundColor: theme.palette.background.default,
  background: `no-repeat center/cover url(${fangorn})`,
  overflow: 'hidden',

  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 10,

  '&::before': {
    content: '""',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    position: 'absolute',
    background: 'white',
    zIndex: -1,
    opacity: 0.4,
  },
};

export const notFoundationRingWrapperStyles = {
  display: 'inline-block',
  animation: `${rotate} 10s linear infinite`,
  transformOrigin: '50% 50%',
  height: '250px',
};

export const notFoundationRingStyles = {
  height: '100%',
};

export const notFoundationTitleStyles = {
  width: '50%',
  textAlign: 'center',

  '& span': {
    fontWeight: 700,
  },
};

export const notFoundationContentStyles = {
  width: '50%',
  fontFamily: '"Tolkien", sans-serif;',
  fontSize: '2rem',
  fontWeight: '600',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  p: 0,
  m: 0,
};
