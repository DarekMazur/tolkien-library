import { theme } from '@/lib/theme.tsx';
import { TableCellProps, TableRow } from '@mui/material';
import { ReactNode } from 'react';

interface ITableCellProps extends TableCellProps {
  children: ReactNode;
}

const StyledTableRow = ({ children }: ITableCellProps) => {
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
