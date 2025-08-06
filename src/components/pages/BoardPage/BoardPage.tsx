import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { useMe } from '@/hooks/useMe';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import { useGetLatestQuery, useGetUsersQuery } from '../../../../store';
import { isBook, isPublisher, isTranslator } from '@/lib/helpers/publicationsTypeGuard.ts';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { formatDate } from '@/lib/helpers/formatDate';
import { getLatest } from '@/lib/helpers/getLatest.ts';
import { EBoardEnums } from '@/lib/utils/boardEnums.ts';
import BoardHeader from '@/components/atoms/BoardHeader/BoardHeader.tsx';

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
      <Box sx={{ width: '100%', py: 4, display: 'flex', justifyContent: 'space-evenly' }}>
        <Box>
          <Typography variant="h3" component="h4">
            Newest User
          </Typography>
          <Typography>
            {lastUser()
              ? `${lastUser()?.userName} (${lastUser()?.id === user.id ? 'you' : formatDate(lastUser()!.createdAt)})`
              : 'No users'}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h3" component="h4">
            Newest Entry
          </Typography>
          <Typography>
            {entryData &&
            getLatest(entryData) &&
            (isBook(entryData) || isTranslator(entryData) || isPublisher(entryData)) ? (
              <Link
                component={RouterLink}
                to={`/library/${isBook(entryData) ? 'books' : isTranslator(entryData) ? 'translator' : 'publisher'}/${createSlug(getLatest(entryData)!)}`}
              >
                {getLatest(entryData)} ({formatDate(entryData!.createdAt)})
              </Link>
            ) : (
              `${getLatest(entryData)} (${formatDate(entryData!.createdAt)})`
            )}
          </Typography>
        </Box>
      </Box>
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
