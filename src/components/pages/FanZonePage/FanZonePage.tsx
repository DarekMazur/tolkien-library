import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

/**
 * FanZonePage component displays the FanZone page header, a divider,
 * and a list of navigation links to fanzins and fan editions.
 *
 * @component
 * @example
 * return <FanZonePage />;
 */

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
          <a href="/library/fanedition">
            <ListItemText primary="Fan's Editions" />
          </a>
        </ListItem>
      </List>
    </Box>
  );
};

export default FanZonePage;
