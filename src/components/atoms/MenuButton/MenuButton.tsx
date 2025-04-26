import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const menuIconStyles = {
  width: '3rem',
  height: '3rem',
};

const MenuButton = () => {
  return (
    <IconButton sx={menuIconStyles} size="large">
      <MenuIcon fontSize="inherit" />
    </IconButton>
  );
};

export default MenuButton;
