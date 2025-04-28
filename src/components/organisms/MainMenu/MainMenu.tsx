import { Box, Divider, Drawer, Link, List, ListItem, ListItemText } from '@mui/material';
import { mainMenu } from '../../../lib/mockData/data.ts';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuButton from '../../atoms/MenuButton/MenuButton.tsx';

interface IMainMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const menuListStyles = {
  minWidth: '20rem',
  px: '1rem',
};

const menuListItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const menuDividerStyles = {
  my: '0.5rem',
};

const menuCloseStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  p: '1rem',
};

const MainMenu = ({ isMenuOpen, toggleMenu }: IMainMenuProps) => {
  return (
    <Drawer open={isMenuOpen} onClose={toggleMenu}>
      <Box sx={menuCloseStyles}>
        <MenuButton toggleMenu={toggleMenu} isClose />
      </Box>
      <List sx={menuListStyles}>
        <>
          {mainMenu.map((item, index) =>
            !item.title && item.isDivider ? (
              <Divider key={`div_${index}`} sx={menuDividerStyles} />
            ) : (
              <ListItem key={item.title}>
                <Link href={item.link} sx={menuListItemStyles}>
                  <>
                    {item.link === '/' ? (
                      <FiberNewIcon />
                    ) : item.link === '/articles' ? (
                      <AttachFileIcon />
                    ) : item.link === '/contact' ? (
                      <ContactMailIcon />
                    ) : (
                      <DoubleArrowIcon />
                    )}
                  </>
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
