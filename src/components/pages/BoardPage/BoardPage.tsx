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
import {
  isBook,
  isFanEdition,
  isFanzin,
  isPublication,
  isPublisher,
  isTranslator,
} from '@/lib/helpers/publicationsTypeGuard.ts';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { TPublications } from '@/lib/types';
import { formatDate } from '@/lib/helpers/formatDate';

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

  const getLatest = (entryData: TPublications | undefined) => {
    if (isBook(entryData)) {
      return entryData.polishTitle;
    }

    if (isTranslator(entryData)) {
      return `${entryData.firstName} ${entryData.lastName}`;
    }

    if (
      isPublication(entryData) ||
      isFanzin(entryData) ||
      isFanEdition(entryData) ||
      isPublisher(entryData)
    ) {
      return entryData.title;
    }

    return null;
  };

  const content = ['news', 'book', 'Publication', 'FanZone', 'Translator', 'Publisher'];

  return (
    <Wrapper>
      <Typography variant="h2">Admin Panel</Typography>
      <Typography variant="h3">You're logged in as {user.role.roleName}</Typography>
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
