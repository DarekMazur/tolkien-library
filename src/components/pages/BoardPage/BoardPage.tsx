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
import { format, isToday, isYesterday } from 'date-fns';
import { pl } from 'date-fns/locale';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { useMe } from '@/hooks/useMe';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import { useGetUsersQuery } from '../../../../store';

const BoardPage = () => {
  const { data, isLoading: dataLoading, isError } = useGetUsersQuery();
  const { user, isLoading } = useMe();

  if (isLoading || dataLoading) {
    return <Loader isLoading={isLoading || dataLoading} />;
  }

  if (!user || isError) {
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

  const formatDate = (date: Date): string => {
    if (isToday(date)) {
      return 'today';
    }

    if (isYesterday(date)) {
      return 'yesterday';
    }

    return format(date, 'd MMMM yyyy HH:mm', { locale: pl });
  };

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
            <Link component={RouterLink} to={'/'}>
              Lorem ipsum
            </Link>
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
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemButton>
              <ListItemText primary="Add news" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemButton>
              <ListItemText primary="Add book" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemButton>
              <ListItemText primary="Add Publication" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemButton>
              <ListItemText primary="Add Fan edition" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemButton>
              <ListItemText primary="Add Translator" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemButton>
              <ListItemText primary="Add Publisher" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Wrapper>
  );
};

export default BoardPage;
