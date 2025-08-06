import { Typography } from '@mui/material';

const BoardHeader = ({ userRole }: { userRole: string }) => {
  return (
    <>
      <Typography variant="h2">Admin Panel</Typography>
      <Typography variant="h3">You're logged in as {userRole}</Typography>
    </>
  );
};

export default BoardHeader;
