import React from 'react';
import { Box, Divider, Drawer, List } from '@mui/material';
import MenuButton from '../../atoms/MenuButton/MenuButton.tsx';
import MenuListItem from '../../atoms/MenuListItem/MenuListItem.tsx';
import { menuCloseStyles, menuDividerStyles, menuListStyles } from './MainMenu.styles.ts';
import { useGetNavigationQuery } from '../../../../store';

interface IMainMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MainMenu = ({ isMenuOpen, toggleMenu }: IMainMenuProps) => {
  const { data: navListItems, isLoading: navigationLoading } = useGetNavigationQuery();

  return (
    <Drawer open={isMenuOpen} onClose={toggleMenu}>
      {navigationLoading ? null : (
        <>
          <Box sx={menuCloseStyles}>
            <MenuButton toggleMenu={toggleMenu} isClose />
          </Box>
          <List sx={menuListStyles}>
            <>
              {navListItems!.map((item) =>
                !item.title && item.isDivider ? (
                  <Divider key={item.id} sx={menuDividerStyles} />
                ) : (
                  <React.Fragment key={item.id}>
                    <MenuListItem item={item} />
                  </React.Fragment>
                ),
              )}
            </>
          </List>
        </>
      )}
    </Drawer>
  );
};

export default MainMenu;
