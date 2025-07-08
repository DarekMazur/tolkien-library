import type { ReactElement } from 'react';
import { TableHead, TableSortLabel } from '@mui/material';
import type { TAllowedPaths, TOrder, TPublicationType } from '@/lib/types';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell';
import { styledSort } from './TableHeader.styles';

interface ITableHeaderProps<T extends TPublicationType> {
  order: TOrder;
  orderBy: TAllowedPaths<T> | null;
  handleRequestSort: (property: TAllowedPaths<T>) => void;
  headerTitles: Array<{
    displayTitle: string;
    key: TAllowedPaths<T>;
  }>;
}

const TableHeader = <T extends TPublicationType>({
  order,
  orderBy,
  handleRequestSort,
  headerTitles,
}: ITableHeaderProps<T>): ReactElement => {
  return (
    <TableHead>
      <StyledTableRow>
        {headerTitles.map(({ displayTitle, key }) => (
          <StyledTableCell key={key} sortDirection={orderBy === key ? order : false}>
            <TableSortLabel
              active={orderBy === key}
              direction={orderBy === key ? order : 'asc'}
              onClick={() => handleRequestSort(key)}
              sx={styledSort}
            >
              {displayTitle}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
