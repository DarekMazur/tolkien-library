import { Box, TextField } from '@mui/material';
import { searchInputStyles, searchTextFieldStyles } from './StyledSearchIcon.style.ts';
import IconSearch from '@/components/atoms/IconSearch/IconSearch.tsx';

const SearchInput = () => {
  return (
    <Box sx={searchInputStyles} aria-label="Searchbar">
      <IconSearch />
      <TextField id="input-search" label="Szukaj..." sx={searchTextFieldStyles} />
    </Box>
  );
};

export default SearchInput;
