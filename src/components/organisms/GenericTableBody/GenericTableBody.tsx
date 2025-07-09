import { ReactNode, useMemo } from 'react';
import { TableBody } from '@mui/material';
import {
  ICommonId,
  IHeaderDefinition,
  ITranslatorProps,
  TAllowedPaths,
  TOrder,
  TPathValue,
} from '@/lib/types';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell';
interface IGenericTableBodyProps<T extends ICommonId> {
  data: T[];
  order: TOrder;
  orderBy: TAllowedPaths<T> | null;
  headers: IHeaderDefinition<T>[];
  getDisplayValue: <P extends TAllowedPaths<T>>(item: T, key: P) => TPathValue<T, P> | null;
}
const GenericTableBody = <T extends ICommonId>({
  data,
  order,
  orderBy,
  headers,
  getDisplayValue,
}: IGenericTableBodyProps<T>) => {
  const sortedData = useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort((a, b) => {
      const aValue = getDisplayValue(a, orderBy!);
      const bValue = getDisplayValue(b, orderBy!);

      const av = (aValue as ITranslatorProps)?.lastName ?? aValue ?? null;
      const bv = (bValue as ITranslatorProps)?.lastName ?? bValue ?? null;

      if (av === null) return 1;
      if (bv === null) return -1;

      const comparison = av > bv ? 1 : av < bv ? -1 : 0;
      return order === 'desc' ? -comparison : comparison;
    });
  }, [data, order, orderBy, getDisplayValue]);
  return (
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
  );
};
export default GenericTableBody;
