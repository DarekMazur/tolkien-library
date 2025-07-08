// GenericTable.tsx

import { ReactNode, useMemo, useState } from 'react';
import { Divider, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import { EPublicationType, TAllowedPaths, TOrder, TPublicationType } from '@/lib/types';
import { useGenericHeaders } from '@/hooks/useGenericHeaders';
import TableHeader from '@/components/molecules/TableHeader/TableHeader';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell';

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

  const sortedData = useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort((a, b) => {
      const aValue = getDisplayValue(a, orderBy!);
      const bValue = getDisplayValue(b, orderBy!);

      const av = aValue ?? null;
      const bv = bValue ?? null;

      if (av === null) return 1;
      if (bv === null) return -1;

      const comparison = av > bv ? 1 : av < bv ? -1 : 0;
      return order === 'desc' ? -comparison : comparison;
    });
  }, [data, order, orderBy, getDisplayValue]);

  const headerTitles = headers.map((header) => ({
    displayTitle: header.displayTitle,
    key: header.key as TAllowedPaths<T>,
  }));

  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" component="h2" gutterBottom>
          {subtitle}
        </Typography>
      )}
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy as string}
            handleRequestSort={handleRequestSort as (key: string) => void}
            headerTitles={headerTitles}
          />
          <TableBody>
            {sortedData.map((item) => (
              <StyledTableRow key={item.id}>
                {headers.map((header) => {
                  const raw = getDisplayValue(item, header.key as TAllowedPaths<T>);

                  const reactNodeValue: ReactNode =
                    raw === null
                      ? '-'
                      : typeof raw === 'object'
                        ? [
                            (raw as { firstName?: string; lastName?: string }).firstName,
                            (raw as { firstName?: string; lastName?: string }).lastName,
                          ]
                            .filter(Boolean)
                            .join(' ') || '-'
                        : String(raw);

                  return <StyledTableCell key={header.key}>{reactNodeValue}</StyledTableCell>;
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GenericTable;
