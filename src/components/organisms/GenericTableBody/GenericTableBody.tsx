import { ReactNode, useMemo } from 'react';
import { TableBody } from '@mui/material';
import {
  ICommonId,
  IHeaderDefinition,
  IFanEditionsProps,
  IPublisherProps,
  ITranslatorProps,
  TAllowedPaths,
  TOrder,
  TPathValue,
} from '@/lib/types';
import StyledTableRow from '@/components/atoms/StyledTableRow/StyledTableRow';
import StyledTableCell from '@/components/atoms/StyledTableCell/StyledTableCell';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import CustomLink from '@/components/atoms/CustomLink/CustomLink.tsx';
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
  const hasLinkableField = (
    item: unknown,
  ): item is {
    polishTitle?: string;
    publisher?: IPublisherProps;
    author?: string;
    translator?: ITranslatorProps;
  } => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'author' in item &&
      (item as { author?: string }).author === 'J.R.R. Tolkien' &&
      (('polishTitle' in item &&
        typeof (item as { polishTitle?: string }).polishTitle === 'string') ||
        ('publisher' in item &&
          typeof (item as { publisher?: IPublisherProps }).publisher === 'object') ||
        ('translator' in item &&
          typeof (item as { translator?: ITranslatorProps }).translator === 'object'))
    );
  };

  const isPolishTitle = (item: unknown, raw: unknown): boolean => {
    return hasLinkableField(item) && 'polishTitle' in item && item.polishTitle === raw;
  };

  const isPublisher = (item: unknown, raw: unknown): boolean => {
    return hasLinkableField(item) && 'publisher' in item && item.publisher?.title === raw;
  };

  const isTranslator = (item: unknown, raw: unknown): boolean => {
    return (
      hasLinkableField(item) &&
      'translator' in item &&
      `${item.translator?.firstName} ${item.translator?.lastName}` === raw
    );
  };

  const createLink = (value: string, type: 'book' | 'publisher' | 'translator') => {
    const slug = createSlug(value);
    const path =
      type === 'book'
        ? `/library/books/${slug}`
        : type === 'publisher'
          ? `/library/publishers/${slug}`
          : `/library/translator/${slug}`;
    return <CustomLink href={path}>{value}</CustomLink>;
  };

  const isIMumakilProps = (item: unknown): item is IFanEditionsProps => {
    return typeof item === 'object' && item !== null && 'cover' in item && 'title' in item;
  };

  const isValidImageUrl = (value: unknown): value is string => {
    if (typeof value !== 'string') return false;

    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const getReactNodeValue = (
    item: unknown,
    raw: TPathValue<T, TAllowedPaths<T>> | null,
  ): ReactNode => {
    if (raw === null) {
      return '-';
    }

    if (isIMumakilProps(item) && isValidImageUrl(raw)) {
      return (
        <img
          src={raw}
          alt={`${item.title} cover`}
          style={{ maxHeight: '150px', maxWidth: '200px', objectFit: 'contain' }}
        />
      );
    }

    if (typeof raw === 'object') {
      const translatorName = getTranslatorName(raw);

      if (isTranslator(item, translatorName)) {
        return createLink(translatorName, 'translator');
      }

      return translatorName || '-';
    }

    if (isPolishTitle(item, raw)) {
      return createLink(String(raw), 'book');
    }

    if (isPublisher(item, raw)) {
      return createLink(String(raw), 'publisher');
    }

    return String(raw);
  };

  const getTranslatorName = (raw: unknown): string => {
    const translator = raw as { firstName?: string; lastName?: string };
    return [translator.firstName, translator.lastName].filter(Boolean).join(' ');
  };

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

            const reactNodeValue = getReactNodeValue(item, raw);

            return <StyledTableCell key={header.key}>{reactNodeValue}</StyledTableCell>;
          })}
        </StyledTableRow>
      ))}
    </TableBody>
  );
};
export default GenericTableBody;
