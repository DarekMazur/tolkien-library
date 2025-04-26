import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  StyledSearchIcon,
  StyledSearchInput,
  StyledSearchTextField,
} from './StyledSearchIcon.style.ts';

const SearchInput = () => {
  return (
    <Box sx={StyledSearchInput}>
      <SearchIcon style={StyledSearchIcon} />
      <TextField id="input-search" label="Szukaj..." sx={StyledSearchTextField} />
    </Box>
  );
};

export default SearchInput;
