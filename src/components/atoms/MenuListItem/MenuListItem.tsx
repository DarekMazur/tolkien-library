import { ListItem, Link, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { IMainMenuList } from '@/lib/types.ts';

interface IMenuListItemProps {
  item: IMainMenuList;
}

const menuListItemStyles = {
  display: 'flex',
  alignItems: 'center',
};

const MenuListItem = ({ item }: IMenuListItemProps) => {
  return (
    <ListItem>
      <ListItemButton component={Link} href={item.link} sx={menuListItemStyles}>
        <ListItemIcon>
          {item.link === '/' ? (
            <FiberNewIcon />
          ) : item.link === '/articles' ? (
            <AttachFileIcon />
          ) : item.link === '/contact' ? (
            <ContactMailIcon />
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
