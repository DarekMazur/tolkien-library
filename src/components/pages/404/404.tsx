import { Box, Button, Typography } from '@mui/material';
import Ring from '@/assets/vector/ring.svg?react';
import {
  notFoundationContentStyles,
  notFoundationRingStyles,
  notFoundationRingWrapperStyles,
  notFoundationTitleStyles,
  notFoundWrapperStyles,
} from '@/components/pages/404/404.styles.ts';

const PageNotFound = () => {
  return (
    <Box sx={notFoundWrapperStyles}>
      <Box sx={notFoundationRingWrapperStyles}>
        <Ring style={notFoundationRingStyles} />
      </Box>
      <Typography variant="h2" sx={notFoundationTitleStyles}>
        <Typography variant="h2" component="span">
          404
        </Typography>{' '}
        steps into wild lands...
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={notFoundationContentStyles}>
        Not all those who wander are lost. However, you, unfortunately, just happened to stray...
        <Button variant="outlined" sx={{ p: '1rem', m: '1rem', fontWeight: 700 }} href="/">
          Better go back Home
        </Button>
      </Typography>
    </Box>
  );
};

export default PageNotFound;
