import { Box, Typography } from '@mui/material';

const NoContent = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h2"
        component="h3"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        Nothing found...
      </Typography>
    </Box>
  );
};

export default NoContent;
