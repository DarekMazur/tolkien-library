import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useLocation } from 'react-router';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import CategoryPage from '@/components/pages/CategoryPage/CategoryPage.tsx';
import { getBooksByAuthor, getCategoryBySlug } from '@/lib/getDataFromApi.ts';
import { useApi } from '@/hooks/useApi.tsx';
import {
  Box,
  Divider,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CategoryLayout = () => {
  const location = useLocation();
  const categoryFullSlug = location.pathname.split('/');
  const categorySlug = categoryFullSlug[categoryFullSlug.length - 1];
  const { data: category, isLoading, isError } = useApi(() => getCategoryBySlug(categorySlug));
  const {
    data: books,
    isError: booksError,
    isLoading: booksLoading,
  } = useApi(() => getBooksByAuthor('J.R.R. Tolkien'));

  return (
    <Wrapper>
      {isLoading || booksLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          {isError || booksError ? null : books ? (
            <>
              <Box>
                <Box>
                  <Typography variant="h2">J.R.R. Tolkien's books catalog</Typography>
                  <Typography>Catalog</Typography>
                </Box>
                <Typography variant="h3">Publications list</Typography>
                <Divider />
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Orginal Title</StyledTableCell>
                      <StyledTableCell>Polish Title</StyledTableCell>
                      <StyledTableCell align="right">Translator</StyledTableCell>
                      <StyledTableCell align="right">Publisher</StyledTableCell>
                      <StyledTableCell align="right">Year</StyledTableCell>
                      <StyledTableCell align="right">Pub. no</StyledTableCell>
                      <StyledTableCell align="right">Cover</StyledTableCell>
                      <StyledTableCell align="right">Series</StyledTableCell>
                      <StyledTableCell align="right">ISBN</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book) => (
                      <StyledTableRow key={book.id}>
                        <StyledTableCell component="th" scope="row">
                          {book.originalTitle}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {book.polishTitle}
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
                        <StyledTableCell align="right">{book.isbn}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : category ? (
            <CategoryPage category={category} />
          ) : null}
        </>
      )}
    </Wrapper>
  );
};

export default CategoryLayout;
