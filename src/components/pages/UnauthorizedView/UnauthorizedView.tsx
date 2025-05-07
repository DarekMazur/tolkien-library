import { Button, Typography } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import UnauthorizedIcon from '@/components/molecules/UnauthorizedIcon/UnauthorizedIcon.tsx';
import {
  unauthorizedButtonStyles,
  unauthorizedTitleStyles,
} from '@/components/pages/UnauthorizedView/UnauthorizedView.styles.ts';

const UnauthorizedView = () => {
  return (
    <Wrapper isCenter isDark margin={0}>
      <UnauthorizedIcon />
      <Typography variant="h3" sx={unauthorizedTitleStyles}>
        The dark fire will not avail you, Flame of Udûn!{' '}
        <Button href="/" sx={unauthorizedButtonStyles} role="button">
          Go back
        </Button>{' '}
        to the shadow.
      </Typography>
    </Wrapper>
  );
};

export default UnauthorizedView;
