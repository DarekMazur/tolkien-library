import { Divider, Drawer, Link, List, ListItem, ListItemText } from '@mui/material';
import { mainMenu } from '../../../lib/mockData/data.ts';

interface IMainMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MainMenu = ({ isMenuOpen, toggleMenu }: IMainMenuProps) => {
  return (
    <Drawer open={isMenuOpen} onClose={toggleMenu}>
      <List>
        <>
          {mainMenu.map((item, index) =>
            !item.title && item.isDivider ? (
              <Divider key={`div_${index}`} />
            ) : (
              <ListItem key={item.title}>
                <Link href={item.link}>
                  <ListItemText primary={item.title} />
                </Link>
              </ListItem>
            ),
          )}
        </>
      </List>
    </Drawer>
  );
};

export default MainMenu;
