import { Box, Button, Typography } from '@mui/material';
import gandalf from '@/assets/images/ysnp.jpeg';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import Flames from '@/assets/vector/flames.svg?react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@/lib/theme.tsx';

const flameMovement = keyframes`
  50% {
    transform: scale(0.98,1.0) translate(0, 2px) rotate(-1deg);
  }
`;

const flameDisappear = keyframes`
  0%{
    transform: translate(0) rotate(180deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-10px, -40px) rotate(180deg);
    opacity: 0;
  }
`;

const FireWrapper = styled.div`
  height: auto;
  left: 50%;
  position: absolute;
  bottom: -50px;
  transform: translateX(-50%);
  z-index: 4;

  .mo-fire svg {
    width: 100%;
    height: auto;
    position: relative;
    right: 40px;
  }

  .flame {
    animation-name: ${flameDisappear};
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    opacity: 0.5;
    transform-origin: 45% 45% 0;
  }
  .flame.one {
    animation-delay: 1s;
    animation-duration: 3s;
  }
  .flame.two {
    animation-duration: 5s;
    animation-delay: 1s;
  }

  .flame-main {
    animation-name: ${flameMovement};
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  .flame-main.one {
    animation-duration: 2.2s;
    animation-delay: 1s;
  }
  .flame-main.two {
    animation-duration: 2s;
    animation-delay: 1s;
  }
  .flame-main.three {
    animation-duration: 2.1s;
    animation-delay: 3s;
  }
  .flame-main.four {
    animation-duration: 3.2s;
    animation-delay: 4s;
  }
  .flame-main.five {
    animation-duration: 2.5s;
    animation-delay: 5s;
  }
`;

const UnauthorizedView = () => {
  return (
    <Wrapper isCenter isDark margin={0}>
      <Box sx={{ position: 'relative', backgroundColor: theme.palette.primary.main }}>
        <FireWrapper>
          <Flames />
        </FireWrapper>
        <img
          src={gandalf}
          alt="You Shall Not Pass"
          style={{
            zIndex: 5,
            position: 'relative',
            maxWidth: '350px',
            maxHeight: '350px',
            borderRadius: '0.5rem',
          }}
        />
      </Box>
      <Typography
        variant="h3"
        sx={{ m: '2rem', fontSize: '2rem', color: theme.palette.secondary.main }}
      >
        The dark fire will not avail you, Flame of Udûn!{' '}
        <Button
          href="/"
          sx={{
            fontFamily: 'Tolkien, serif',
            fontSize: '2.1rem',
            color: theme.palette.secondary.light,
            fontWeight: 700,
          }}
        >
          Go back
        </Button>{' '}
        to the shadow.
      </Typography>
    </Wrapper>
  );
};

export default UnauthorizedView;
