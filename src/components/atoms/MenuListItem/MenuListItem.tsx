import { ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import { IMainMenuList } from '@/lib/types';
import CustomLink from '@/components/atoms/CustomLink/CustomLink';

interface IMenuListItemProps {
  item: IMainMenuList;
  toggleMenu: () => void;
}

const menuListItemStyles = {
  display: 'flex',
  alignItems: 'center',
};

const MenuListItem = ({ item, toggleMenu }: IMenuListItemProps) => {
  return (
    <ListItem>
      <ListItemButton
        component={CustomLink}
        href={item.link!}
        styles={menuListItemStyles}
        onClick={toggleMenu}
        isNav
      >
        <ListItemIcon>
          {item.link === '/' ? (
            <FiberNewIcon />
          ) : item.link === '/articles' ? (
            <AttachFileIcon />
          ) : item.link === '/contact' ? (
            <ContactMailIcon />
          ) : item.link === '/library' ? (
            <InfoIcon />
          ) : (
            <DoubleArrowIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuListItem;
