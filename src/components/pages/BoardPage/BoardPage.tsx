import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
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
      <Box>
        <List>
          <ListItem>
            <ListItemButton>Add book</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Add Publication</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Add Fan edition</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Add Translator</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Add Publisher</ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Wrapper>
  );
};

export default BoardPage;
