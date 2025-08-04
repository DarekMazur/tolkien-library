import { Box, Typography } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { useMe } from '@/hooks/useMe';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';

const BoardPage = () => {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!user) {
    return <Error />;
  }

  return (
    <Wrapper>
      <Typography variant="h2">Admin Panel</Typography>
      <Typography variant="h3">You're logged in as {user.role.roleName}</Typography>
      <Box></Box>
    </Wrapper>
  );
};

export default BoardPage;
