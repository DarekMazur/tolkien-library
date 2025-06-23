import { Box } from '@mui/material';
import Leaves from '@/assets/vector/leaves.svg?react';
import SearchInput from '@/components/molecules/SearchInput/SearchInput.tsx';
import { decorationImageStyles, headerStyles } from './Header.style.ts';
import MenuButton from '@/components/atoms/MenuButton/MenuButton.tsx';
import HeaderTitle from '@/components/molecules/HeaderTitle/HeaderTitle.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import UserMenu from '@/components/molecules/UserMenu/UserMenu.tsx';

interface IHeaderProps {
  toggleMenu: () => void;
}

const Header = ({ toggleMenu }: IHeaderProps) => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Box component="header" sx={headerStyles}>
      <SearchInput />
      {isAuthenticated && user ? <UserMenu /> : null}
      <HeaderTitle />
      <MenuButton toggleMenu={toggleMenu} />
      <Box sx={decorationImageStyles}>
        <Leaves />
      </Box>
    </Box>
  );
};

export default Header;
