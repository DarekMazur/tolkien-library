import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Jrr from '../../assets/vector/jrrt_elipse.svg?react';
import Leaves from '../../assets/vector/leaves.svg?react';
import SearchInput from '../SearchInput/SearchInput.tsx';
import {
  StyledDecorationImage,
  StyledHeader,
  StyledIdentification,
  StyledLogo,
  StyledMenuIcon,
} from './Header.style.ts';

const Header = () => {
  return (
    <Box component="header" sx={StyledHeader}>
      <SearchInput />
      <Box sx={StyledIdentification}>
        <Jrr style={StyledLogo} />
        <Typography variant="h1">Biblioteka Tolkienisty</Typography>
      </Box>
      <IconButton sx={StyledMenuIcon} size="large">
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <Leaves style={StyledDecorationImage} />
    </Box>
  );
};

export default Header;
