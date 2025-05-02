import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Button, Typography } from '@mui/material';
import ring from '@/assets/images/oneRing.png';

const PageNotFound = () => {
  return (
    <Wrapper>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontFamily: '"Tolkien", sans-serif;',
          fontSize: '2rem',
          fontWeight: '600',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={ring} alt="One Ring To Rule Them All" />
        Not all those who wander are lost. However, you, unfortunately, just happened to stray...
        <Button>Better go back Home</Button>
      </Typography>
    </Wrapper>
  );
};

export default PageNotFound;
