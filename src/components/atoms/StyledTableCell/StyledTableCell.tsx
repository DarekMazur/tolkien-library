import { tableCellClasses } from '@mui/material';
import { theme } from '@/lib/theme.tsx';
import { TableCell } from '@mui/material';

const StyledTableCell = ({ children }) => {
  const tableCellStyles = {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  };

  return <TableCell sx={tableCellStyles}>{children}</TableCell>;
};

export default StyledTableCell;
