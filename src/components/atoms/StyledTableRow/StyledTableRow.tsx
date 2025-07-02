import { theme } from '@/lib/theme.tsx';
import { TableRow } from '@mui/material';

const StyledTableRow = ({ children }) => {
  const tableRowStyles = {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  };

  return <TableRow sx={tableRowStyles}>{children}</TableRow>;
};

export default StyledTableRow;
