import { Box, Container, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Jrr from '../../assets/vector/jrrt_elipse.svg?react';
import Leaves from '../../assets/vector/leaves.svg?react';

const Header = () => {
  return (
    <Container component="header">
      <Box>
        <Jrr />
        <Typography variant="h1">Lorem Ipsum</Typography>
        <Typography variant="h2">Dolor Sit Amet</Typography>
      </Box>
      <MenuIcon />
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <SearchIcon style={{ position: 'absolute', left: '0.5rem' }} />
        <TextField
          id="input-search"
          label="Szukaj..."
          sx={{
            '& fieldset': {
              borderRadius: '3rem',
            },
            '& .MuiOutlinedInput-input': {
              paddingLeft: '2.2rem',
            },
            '& .MuiInputLabel-root': {
              marginLeft: '1.2rem',
            },
            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
              marginLeft: 0,
            },
          }}
        />
      </Box>
      <Leaves style={{ width: 'auto', transformOrigin: 'center', transform: 'rotate(-45deg)' }} />
    </Container>
  );
};

export default Header;
