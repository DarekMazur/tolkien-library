import React from 'react';
import { Box, Divider, Drawer, List } from '@mui/material';
import { mainMenu } from '../../../lib/mockData/data.ts';
import MenuButton from '../../atoms/MenuButton/MenuButton.tsx';
import MenuListItem from '../../atoms/MenuListItem/MenuListItem.tsx';
import { menuCloseStyles, menuDividerStyles, menuListStyles } from './MainMenu.styles.ts';

interface IMainMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

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
              <React.Fragment key={item.title}>
                <MenuListItem item={item} />
              </React.Fragment>
            ),
          )}
        </>
      </List>
    </Drawer>
  );
};

export default MainMenu;
