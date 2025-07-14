import { useApi } from '@/hooks/useApi';
import {
  getCategoryBySlug,
  getBooksByAuthor,
  getAllPublications,
  getAllOnline,
} from '@/lib/getDataFromApi';
import { EPublicationType } from '@/lib/types';
import { useLibraryParams } from './useLibraryParams';

export const useLibraryData = () => {
  const { type, slug, search, isValid } = useLibraryParams();

  if (!isValid) return { state: 'invalid' as const };

  const shouldFetchBooks = type === EPublicationType.BOOK;
  const shouldFetchArticles = type === EPublicationType.ARTICLE;
  const shouldFetchOnline = type === EPublicationType.ONLINE;
  const shouldFetchCategory =
    type !== EPublicationType.BOOK &&
    type !== EPublicationType.ARTICLE &&
    type !== EPublicationType.ONLINE &&
    !!slug;

  const {
    data: books,
    isLoading: booksLoading,
    isError: booksError,
  } = useApi(() => getBooksByAuthor('J.R.R. Tolkien', search !== 'jrrt'), {
    enabled: shouldFetchBooks,
  });

  const {
    data: publications,
    isLoading: publicationsLoading,
    isError: publicationsError,
  } = useApi(() => getAllPublications(), {
    enabled: shouldFetchArticles,
  });

  const {
    data: online,
    isLoading: onlineLoading,
    isError: onlineError,
  } = useApi(() => getAllOnline(), {
    enabled: shouldFetchOnline,
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

  if (shouldFetchArticles) {
    if (publicationsLoading) return { state: 'loading' as const };
    if (publicationsError) return { state: 'error' as const };
    return { state: 'publications' as const, data: publications!, type };
  }

  if (shouldFetchOnline) {
    if (onlineLoading) return { state: 'loading' as const };
    if (onlineError) return { state: 'error' as const };
    return { state: 'online' as const, data: online!, type };
  }

  if (shouldFetchCategory) {
    if (categoryLoading) return { state: 'loading' as const };
    if (categoryError) return { state: 'error' as const };
    return { state: 'category' as const, data: category!, type };
  }

  return { state: 'empty' as const, type };
};
