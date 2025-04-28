import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const menuIconStyles = {
  width: '3rem',
  height: '3rem',
};

interface IMenuButtonProps {
  toggleMenu: () => void;
  isClose?: boolean;
}

const MenuButton = ({ toggleMenu, isClose }: IMenuButtonProps) => {
  return (
    <IconButton sx={menuIconStyles} size="large" onClick={toggleMenu}>
      <>{isClose ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}</>
    </IconButton>
  );
};

export default MenuButton;
