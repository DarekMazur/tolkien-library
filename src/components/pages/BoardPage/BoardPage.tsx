import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { useMe } from '@/hooks/useMe';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import { useGetLatestQuery, useGetUsersQuery } from '../../../../store';
import { EBoardEnums } from '@/lib/utils/boardEnums.ts';
import BoardHeader from '@/components/atoms/BoardHeader/BoardHeader.tsx';
import BoardStats from '@/components/molecules/BoardStats/BoardStats.tsx';

const BoardPage = () => {
  const { data, isLoading: dataLoading, isError } = useGetUsersQuery();
  const { data: entryData, isLoading: entryLoading, isError: entryError } = useGetLatestQuery();
  const { user, isLoading } = useMe();

  const { NEWS, BOOK, PUBLISHER, PUBLICATION, FANZONE, TRANSLATOR } = EBoardEnums;

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

  const content = [NEWS, BOOK, PUBLISHER, PUBLICATION, FANZONE, TRANSLATOR];

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
          {content.map((item) => (
            <ListItem key={item}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemButton>
                <ListItemText primary={`Add ${item}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Wrapper>
  );
};

export default BoardPage;
