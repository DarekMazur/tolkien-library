import { TAllowedPaths, TOrder } from '@/lib/types';
import { TableHead, TableSortLabel } from '@mui/material';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow.tsx';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell.tsx';
import { styledSort } from '@/components/molecules/TableHeader/TableHeader.styles.ts';

const TableHeader = ({
  order,
  orderBy,
  handleRequestSort,
  headerTitles,
}: {
  order: TOrder;
  orderBy: TAllowedPaths;
  handleRequestSort: (property: TAllowedPaths) => void;
  headerTitles: {
    displayTitle: string;
    key: TAllowedPaths;
  }[];
}) => {
  return (
    <TableHead>
      <StyledTableRow>
        {headerTitles.map((title) => (
          <StyledTableCell key={title.key}>
            <TableSortLabel
              active={orderBy === title.key}
              direction={orderBy === title.key ? order : 'asc'}
              onClick={() => handleRequestSort(title.key)}
              sx={styledSort}
            >
              {title.displayTitle}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
