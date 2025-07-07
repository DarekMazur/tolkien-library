import { IBookProps, TAllowedPaths, TOrder } from '@/lib/types';
import { Alert, Box, Divider, Paper, Table, TableContainer, Typography } from '@mui/material';
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

  return (
    <>
      {books.length === 0 ? (
        <Box>No books found</Box>
      ) : (
        <>
          <Box>
            {books[0].author !== 'J.R.R. Tolkien' ? (
              <>
                <Box sx={{ pb: '2rem' }}>
                  <Typography variant="h2">Tolkienarium</Typography>
                  <Alert severity="info">
                    Photos and verification of editions: Maciej Lewandowski, Hubert Lavender,
                    Przemyslaw Szymanski, Lukasz Zarzycki, anonymous support from a group of
                    collectors and their own shelves.
                  </Alert>
                </Box>
                <Typography variant="h3">Foreign Tolkienistics, published in Polish</Typography>
              </>
            ) : (
              <>
                <Box sx={{ pb: '2rem' }}>
                  <Typography variant="h2">J.R.R. Tolkien's books catalog</Typography>
                  <Typography>Catalog</Typography>
                </Box>
                <Typography variant="h3">Publications list</Typography>
              </>
            )}
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
      )}
    </>
  );
};

export default BooksPage;
