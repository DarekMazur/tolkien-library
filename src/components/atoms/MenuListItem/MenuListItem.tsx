import { ListItem, Link } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { IMainMenuList } from '../../../lib/types.ts';

interface IMenuListItemProps {
  item: IMainMenuList;
}

const menuListItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const MenuListItem = ({ item }: IMenuListItemProps) => {
  return (
    <ListItem>
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
      </Link>
    </ListItem>
  );
};

export default MenuListItem;
