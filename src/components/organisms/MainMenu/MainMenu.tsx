import { Drawer, List, ListItem, ListItemText } from '@mui/material';

interface IMainMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MainMenu = ({ isMenuOpen, toggleMenu }: IMainMenuProps) => {
  return (
    <Drawer open={isMenuOpen} onClose={toggleMenu}>
      <List>
        <ListItem>
          <ListItemText primary="Lorem" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ipsum" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dolor" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MainMenu;
