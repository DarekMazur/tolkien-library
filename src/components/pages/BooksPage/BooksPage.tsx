import { IBookProps, TAllowedPaths, TOrder } from '@/lib/types.ts';
import { Box, Divider, Paper, Table, TableContainer, Typography } from '@mui/material';
import { useState } from 'react';
import TableHeader from '@/components/molecules/TableHeader/TableHeader.tsx';
import TableCustomBody from '@/components/organisms/TableCustomBody/TableCustomBody.tsx';
import { useHeaders } from '@/hooks/useHeaders.tsx';

const BooksPage = ({ books }: { books: IBookProps[] }) => {
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<TAllowedPaths>('year');
  const { headers } = useHeaders(books[0]);

  const handleRequestSort = (property: TAllowedPaths) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const headerTitles: {
    displayTitle: string;
    key: TAllowedPaths;
  }[] = [];

  const getTitles = () => {
    Object.keys(books[0]).map((key) => {
      switch (key) {
        case 'originalTitle':
          headerTitles.push({
            displayTitle: 'Original Title',
            key: 'originalTitle',
          });
          break;
        case 'polishTitle':
          headerTitles.push({
            displayTitle: 'Polish Title',
            key: 'polishTitle',
          });
          break;
        case 'author':
          if (books[0].author !== 'J.R.R. Tolkien') {
            headerTitles.push({
              displayTitle: 'Author',
              key: 'author',
            });
            break;
          }
          break;
        case 'translator':
          if (books[0].author !== 'J.R.R. Tolkien') {
            headerTitles.push({
              displayTitle: 'Translator',
              key: 'translator',
            });
            break;
          }
          break;
        case 'publisher':
          headerTitles.push({
            displayTitle: 'Publisher',
            key: 'publisher',
          });
          break;
        case 'year':
          headerTitles.push({
            displayTitle: 'Year',
            key: 'year',
          });
          break;
        case 'publicationNumber':
          headerTitles.push({
            displayTitle: 'Pub. no',
            key: 'publicationNumber',
          });
          break;
        case 'cover':
          if (books[0].author !== 'J.R.R. Tolkien') {
            headerTitles.push({
              displayTitle: 'Cover',
              key: 'cover',
            });
            break;
          }
          break;
        case 'series':
          if (books[0].author !== 'J.R.R. Tolkien') {
            headerTitles.push({
              displayTitle: 'Series',
              key: 'series',
            });
            break;
          }
          break;
        case 'isbn':
          headerTitles.push({
            displayTitle: 'ISBN',
            key: 'isbn',
          });
          break;
      }
    });
  };

  getTitles();

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
          <TableHeader
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
            headerTitles={headers}
          />
          <TableCustomBody books={books} order={order} orderBy={orderBy} />
        </Table>
      </TableContainer>
    </>
  );
};

export default BooksPage;
