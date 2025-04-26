import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Jrr from '../../assets/vector/jrrt_elipse.svg?react';
import Leaves from '../../assets/vector/leaves.svg?react';
import SearchInput from '../SearchInput/SearchInput.tsx';
import {
  decorationImageStyles,
  headerStyles,
  identificationStyles,
  logoStyles,
  menuIconStyles,
} from './Header.style.ts';

const Header = () => {
  return (
    <Box component="header" sx={headerStyles}>
      <SearchInput />
      <Box sx={identificationStyles}>
        <Jrr style={logoStyles} />
        <Typography variant="h1">Biblioteka Tolkienisty</Typography>
      </Box>
      <IconButton sx={menuIconStyles} size="large">
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <Leaves style={decorationImageStyles} />
    </Box>
  );
};

export default Header;
