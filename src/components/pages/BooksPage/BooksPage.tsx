import { IBookProps, TOrder } from '@/lib/types.ts';
import { Box, Divider, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell.tsx';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow.tsx';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { validateISBN } from '@/lib/helpers/validateISBN.ts';
import { useState } from 'react';
import TableHeader from '@/components/molecules/TableHeader/TableHeader.tsx';

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
