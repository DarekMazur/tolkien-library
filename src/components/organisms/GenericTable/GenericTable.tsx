import { useState } from 'react';
import { Divider, Paper, Table, TableContainer, Typography } from '@mui/material';
import { EPublicationType, TAllowedPaths, TOrder, TPublicationType } from '@/lib/types';
import { useGenericHeaders } from '@/hooks/useGenericHeaders';
import TableHeader from '@/components/molecules/TableHeader/TableHeader';
import GenericTableBody from '../GenericTableBody/GenericTableBody';

interface IGenericTableProps<T extends TPublicationType> {
  data: T[];
  publicationType: EPublicationType;
  title: string;
  subtitle?: string;
}

const GenericTable = <T extends TPublicationType>({
  data,
  publicationType,
  title,
  subtitle,
}: IGenericTableProps<T>) => {
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<TAllowedPaths<T> | null>(null);

  const { headers, getDisplayValue } = useGenericHeaders<T>(data, publicationType);

  const handleRequestSort = (property: TAllowedPaths<T>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const headerTitles = headers.map((header) => ({
    displayTitle: header.displayTitle,
    key: header.key as TAllowedPaths<T>,
  }));

  return (
    <>
      <Typography variant={subtitle ? 'h2' : 'h3'} component="h1" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" component="h2" gutterBottom>
          {subtitle}
        </Typography>
      )}
      <Divider />
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
            headerTitles={headerTitles}
          />
          <GenericTableBody
            data={data}
            order={order}
            orderBy={orderBy}
            headers={headers}
            getDisplayValue={getDisplayValue}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default GenericTable;
