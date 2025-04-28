import { Box } from '@mui/material';
import Leaves from '@/assets/vector/leaves.svg?react';
import SearchInput from '@/components/molecules/SearchInput/SearchInput.tsx';
import { decorationImageStyles, headerStyles } from './Header.style.ts';
import MenuButton from '@/components/atoms/MenuButton/MenuButton.tsx';
import HeaderTitle from '@/components/molecules/HeaderTitle/HeaderTitle.tsx';

interface IHeaderProps {
  toggleMenu: () => void;
}

const Header = ({ toggleMenu }: IHeaderProps) => {
  return (
    <Box component="header" sx={headerStyles}>
      <SearchInput />
      <HeaderTitle />
      <MenuButton toggleMenu={toggleMenu} />
      <Leaves style={decorationImageStyles} />
    </Box>
  );
};

export default Header;
