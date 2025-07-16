import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

const FanZonePage = () => {
  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>
        FanZone
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <a href="/library/fanzin">
            <ListItemText primary="Fanzins" />
          </a>
        </ListItem>
        <ListItem>
          <a href="/library/mumakil">
            <ListItemText primary="Mumakil" />
          </a>
        </ListItem>
      </List>
    </Box>
  );
};

export default FanZonePage;
