import { TAllowedPaths, TOrder } from '@/lib/types.ts';
import { TableHead, TableSortLabel } from '@mui/material';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow.tsx';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell.tsx';
import { styledSort } from '@/components/molecules/TableHeader/TableHeader.styles.ts';

const TableHeader = ({
  order,
  orderBy,
  handleRequestSort,
}: {
  order: TOrder;
  orderBy: TAllowedPaths;
  handleRequestSort: (property: TAllowedPaths) => void;
}) => {
  const headerTitles: {
    displayTitle: string;
    key: TAllowedPaths;
  }[] = [
    {
      displayTitle: 'Original Title',
      key: 'originalTitle',
    },
    {
      displayTitle: 'Polish Title',
      key: 'polishTitle',
    },
    {
      displayTitle: 'Translator',
      key: 'translator',
    },
    {
      displayTitle: 'Publisher',
      key: 'publisher',
    },
    {
      displayTitle: 'Year',
      key: 'year',
    },
    {
      displayTitle: 'Pub. no',
      key: 'publicationNumber',
    },
    {
      displayTitle: 'Cover',
      key: 'cover',
    },
    {
      displayTitle: 'Series',
      key: 'series',
    },
    {
      displayTitle: 'ISBN',
      key: 'isbn',
    },
  ];

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
