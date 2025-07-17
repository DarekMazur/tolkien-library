import { Box, Typography } from '@mui/material';

const NoContent = ({ alert = 'Nothing found...' }: { alert?: string }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h2"
        component="h3"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        {alert}
      </Typography>
    </Box>
  );
};

export default NoContent;
