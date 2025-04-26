import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  searchIconStyles,
  searchInputStyles,
  searchTextFieldStyles,
} from './StyledSearchIcon.style.ts';

const SearchInput = () => {
  return (
    <Box sx={searchInputStyles}>
      <SearchIcon style={searchIconStyles} />
      <TextField id="input-search" label="Szukaj..." sx={searchTextFieldStyles} />
    </Box>
  );
};

export default SearchInput;
