import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: '1rem',
        top: '1rem',
        zIndex: 5,
      }}
    >
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
  );
};

export default SearchInput;
