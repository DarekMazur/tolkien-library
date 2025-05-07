import { Button, Typography } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { theme } from '@/lib/theme.tsx';
import UnauthorizedIcon from '@/components/molecules/UnauthorizedIcon/UnauthorizedIcon.tsx';

const UnauthorizedView = () => {
  return (
    <Wrapper isCenter isDark margin={0}>
      <UnauthorizedIcon />
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
