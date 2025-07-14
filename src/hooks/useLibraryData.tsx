import { useApi } from '@/hooks/useApi';
import { getCategoryBySlug, getBooksByAuthor } from '@/lib/getDataFromApi';
import { EPublicationType } from '@/lib/types';
import { useLibraryParams } from './useLibraryParams';

export const useLibraryData = () => {
  const { type, slug, search, isValid } = useLibraryParams();

  if (!isValid) return { state: 'invalid' as const };

  const shouldFetchBooks = type === EPublicationType.BOOK;
  const shouldFetchCategory = type !== EPublicationType.BOOK && !!slug;

  const {
    data: books,
    isLoading: booksLoading,
    isError: booksError,
  } = useApi(() => getBooksByAuthor('J.R.R. Tolkien', !!search || search !== 'jrrt'), {
    enabled: shouldFetchBooks,
  });

  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useApi(() => getCategoryBySlug(slug!), { enabled: shouldFetchCategory });

  if (shouldFetchBooks) {
    if (booksLoading) return { state: 'loading' as const };
    if (booksError) return { state: 'error' as const };
    return { state: 'books' as const, data: books!, type };
  }

  if (shouldFetchCategory) {
    if (categoryLoading) return { state: 'loading' as const };
    if (categoryError) return { state: 'error' as const };
    return { state: 'category' as const, data: category!, type };
  }

  return { state: 'empty' as const, type };
};
