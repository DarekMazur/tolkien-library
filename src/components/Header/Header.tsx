import { Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Jrr from '../../assets/vector/jrrt_elipse.svg?react';
import Leaves from '../../assets/vector/leaves.svg?react';
import SearchInput from '../SearchInput/SearchInput.tsx';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        height: '200px',
        p: 0,
        m: 0,
      }}
    >
      <SearchInput />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Jrr style={{ maxHeight: '130px' }} />
        <Typography variant="h1">Biblioteka Tolkienisty</Typography>
      </Box>
      <MenuIcon sx={{ fontSize: '2rem' }} />
      <Leaves
        style={{
          width: 'auto',
          transformOrigin: 'center',
          transform: 'rotate(-45deg)',
          position: 'absolute',
          right: 0,
          bottom: '-50%',
        }}
      />
    </Box>
  );
};

export default Header;
