import { Box, List } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { useMe } from '@/hooks/useMe';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import { useGetLatestQuery, useGetUsersQuery } from '../../../../store';
import BoardHeader from '@/components/atoms/BoardHeader/BoardHeader.tsx';
import BoardStats from '@/components/molecules/BoardStats/BoardStats.tsx';
import ActionsList from '@/components/molecules/ActionsList/ActionsList.tsx';

const BoardPage = () => {
  const { data, isLoading: dataLoading, isError } = useGetUsersQuery();
  const { data: entryData, isLoading: entryLoading, isError: entryError } = useGetLatestQuery();
  const { user, isLoading } = useMe();

  if (isLoading || dataLoading || entryLoading) {
    return <Loader isLoading={isLoading || dataLoading || entryLoading} />;
  }

  if (!user || isError || entryError) {
    return <Error />;
  }

  const lastUser = () => {
    if (data) {
      const users = [...data];
      return users.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0];
    }
  };

  return (
    <Wrapper>
      <BoardHeader userRole={user.role.roleName} />
      <BoardStats latestEntry={entryData} latestUser={lastUser()} />
      <Box>
        <List
          sx={{
            width: 'fit-content',
            minWidth: 0,
          }}
        >
          <ActionsList />
        </List>
      </Box>
    </Wrapper>
  );
};

export default BoardPage;
