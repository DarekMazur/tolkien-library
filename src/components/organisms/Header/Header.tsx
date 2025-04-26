import { Box } from '@mui/material';
import Leaves from '../../../assets/vector/leaves.svg?react';
import SearchInput from '../../molecules/SearchInput/SearchInput.tsx';
import { decorationImageStyles, headerStyles } from './Header.style.ts';
import MenuButton from '../../atoms/MenuButton/MenuButton.tsx';
import HeaderTitle from '../../molecules/HeaderTitle/HeaderTitle.tsx';

const Header = () => {
  return (
    <Box component="header" sx={headerStyles}>
      <SearchInput />
      <HeaderTitle />
      <MenuButton />
      <Leaves style={decorationImageStyles} />
    </Box>
  );
};

export default Header;
