import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const menuIconStyles = {
  width: '3rem',
  height: '3rem',
};

interface IMenuButtonProps {
  toggleMenu: () => void;
}

const MenuButton = ({ toggleMenu }: IMenuButtonProps) => {
  return (
    <IconButton sx={menuIconStyles} size="large" onClick={toggleMenu}>
      <MenuIcon fontSize="inherit" />
    </IconButton>
  );
};

export default MenuButton;
