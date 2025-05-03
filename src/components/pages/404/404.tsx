import { Box, Button, Typography } from '@mui/material';
import fangorn from '@/assets/images/forest.webp';
import Ring from '@/assets/vector/ring.svg?react';
import { theme } from '@/lib/theme.tsx';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PageNotFound = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.default,
          background: `no-repeat center/cover url(${fangorn})`,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            width: '100%',
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
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              animation: `${rotate} 10s linear infinite`,
              transformOrigin: '50% 50%',
              height: '250px',
            }}
          >
            <Ring style={{ height: '100%' }} />
          </Box>
          <Typography variant="h2" sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h2" component="span" sx={{ fontWeight: 700 }}>
              404
            </Typography>{' '}
            steps into wild lands...
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
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
            }}
          >
            Not all those who wander are lost. However, you, unfortunately, just happened to
            stray...
            <Button variant="outlined" sx={{ p: '1rem', m: '1rem', fontWeight: 700 }} href="/">
              Better go back Home
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default PageNotFound;
