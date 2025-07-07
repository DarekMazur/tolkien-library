import { tableCellClasses, TableCellProps } from '@mui/material';
import { theme } from '@/lib/theme.tsx';
import { TableCell } from '@mui/material';
import { ReactNode } from 'react';

interface ITableCellProps extends TableCellProps {
  children: ReactNode;
}

const StyledTableCell = ({ children, ...props }: ITableCellProps) => {
  const tableCellStyles = {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
    },
  };

  return (
    <TableCell sx={tableCellStyles} {...props}>
      {children}
    </TableCell>
  );
};

export default StyledTableCell;
