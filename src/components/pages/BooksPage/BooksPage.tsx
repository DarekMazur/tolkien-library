import { aliases, IBookProps, TAllowedPaths, TOrder, TPathValue } from '@/lib/types.ts';
import { Box, Divider, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell.tsx';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow.tsx';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { validateISBN } from '@/lib/helpers/validateISBN.ts';
import { useState } from 'react';
import TableHeader from '@/components/molecules/TableHeader/TableHeader.tsx';

const BooksPage = ({ books }: { books: IBookProps[] }) => {
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<TAllowedPaths>('year');

  const resolvePath = <P extends TAllowedPaths>(path: P): Extract<string, P> => {
    return (aliases[path as keyof typeof aliases] ?? path) as Extract<string, P>;
  };

  const getValue = <T extends object, P extends string>(
    obj: T,
    path: P,
  ): TPathValue<T, P> | null => {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
      if (current == null) return null;
      if (typeof current !== 'object' || !(key in (current as object))) {
        return null;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return current as TPathValue<T, P>;
  };

  const descendingComparator = <T extends object, P extends TAllowedPaths>(
    a: T,
    b: T,
    path: P,
  ): number => {
    const realPath = resolvePath(path);
    const aVal = getValue(a, realPath) as unknown;
    const bVal = getValue(b, realPath) as unknown;

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return bVal - aVal;
    }
    return 0;
  };

  const getComparator = <T extends object, P extends TAllowedPaths>(order: TOrder, orderBy: P) => {
    return order === 'desc'
      ? (a: T, b: T) => descendingComparator(a, b, orderBy)
      : (a: T, b: T) => -descendingComparator(a, b, orderBy);
  };

  const sortedBooks = <P extends TAllowedPaths>(books: IBookProps[], order: TOrder, orderBy: P) =>
    [...books].sort(getComparator(order, orderBy));

  const handleRequestSort = (property: TAllowedPaths) => {
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
            {sortedBooks(books, order, orderBy).map((book) => (
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
