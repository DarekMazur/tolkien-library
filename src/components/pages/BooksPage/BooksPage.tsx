import { IBookProps, TOrder } from '@/lib/types.ts';
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Typography,
} from '@mui/material';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell.tsx';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow.tsx';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { validateISBN } from '@/lib/helpers/validateISBN.ts';
import { useState } from 'react';
import { theme } from '@/lib/theme.tsx';

const styledSort = {
  color: theme.palette.secondary.main,
  '& .MuiTableSortLabel-icon': {
    color: `${theme.palette.secondary.main} !important`,
  },
  '&:hover': {
    color: `${theme.palette.secondary.main} !important`,
    opacity: '0.7',
  },
  '&.Mui-active': {
    color: `${theme.palette.secondary.main} !important`,
  },
};

const TableHeader = ({
  order,
  orderBy,
  handleRequestSort,
}: {
  order: TOrder;
  orderBy: string;
  handleRequestSort: (property: string) => void;
}) => {
  const headerTitles = [
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

const BooksPage = ({ books }: { books: IBookProps[] }) => {
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<string>('year');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <>
      <Box>
        <Box sx={{ pb: '2rem' }}>
          <Typography variant="h2">J.R.R. Tolkien's books catalog</Typography>
          <Typography>Catalog</Typography>
        </Box>
        <Typography variant="h3">Publications list</Typography>
        <Divider />
      </Box>
      <TableContainer component={Paper} sx={{ mt: '2rem' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHeader order={order} orderBy={orderBy} handleRequestSort={handleRequestSort} />
          <TableBody>
            {books.map((book) => (
              <StyledTableRow key={book.id}>
                <StyledTableCell component="th" scope="row">
                  {book.originalTitle}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <a href={`/book/${createSlug(book.polishTitle)}`}>{book.polishTitle}</a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {book.translator
                    ? `${book.translator?.firstName} ${book.translator?.lastName}`
                    : ''}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {book.publisher ? book.publisher.title : ''}
                </StyledTableCell>
                <StyledTableCell align="right">{book.year}</StyledTableCell>
                <StyledTableCell align="right">{book.publicationNumber}</StyledTableCell>
                <StyledTableCell align="right">{book.cover}</StyledTableCell>
                <StyledTableCell align="right">{book.series ?? ''}</StyledTableCell>
                <StyledTableCell align="right">
                  {validateISBN(book.isbn) ? book.isbn : 'Incorrect number'}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BooksPage;
