import { IBookProps } from '@/lib/types.ts';
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell.tsx';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow.tsx';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { validateISBN } from '@/lib/helpers/validateISBN.ts';

const BooksPage = ({ books }: { books: IBookProps[] }) => {
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
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Original Title</StyledTableCell>
              <StyledTableCell>Polish Title</StyledTableCell>
              <StyledTableCell align="right">Translator</StyledTableCell>
              <StyledTableCell align="right">Publisher</StyledTableCell>
              <StyledTableCell align="right">Year</StyledTableCell>
              <StyledTableCell align="right">Pub. no</StyledTableCell>
              <StyledTableCell align="right">Cover</StyledTableCell>
              <StyledTableCell align="right">Series</StyledTableCell>
              <StyledTableCell align="right">ISBN</StyledTableCell>
            </StyledTableRow>
          </TableHead>
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
