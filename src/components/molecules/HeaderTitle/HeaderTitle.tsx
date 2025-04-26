import { identificationStyles } from '../../organisms/Header/Header.style.ts';
import Logo from '../../atoms/Logo/Logo.tsx';
import { Box, Typography } from '@mui/material';

const HeaderTitle = () => {
  return (
    <Box sx={identificationStyles}>
      <Logo />
      <Typography variant="h1">Biblioteka Tolkienisty</Typography>
    </Box>
  );
};

export default HeaderTitle;
