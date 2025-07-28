import { useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { getBooksByPublisher, getPublisherBySlug } from '@/lib/getDataFromApi';
import { IBookProps, IPublisherProps } from '@/lib/types';

interface UsePublisherDataResult {
  publisher: IPublisherProps | null;
  books: IBookProps[] | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

export const usePublisherData = (slug?: string): UsePublisherDataResult => {
  const {
    data: publisher,
    isError: publisherError,
    isLoading: publisherLoading,
  } = useApi(() => getPublisherBySlug(slug!), {
    enabled: !!slug,
  });

  const {
    data: books,
    isError: booksError,
    isLoading: booksLoading,
  } = useApi(() => getBooksByPublisher(publisher!.id), {
    enabled: !!publisher?.id,
  });

  return useMemo(() => {
    const isLoading = publisherLoading || booksLoading;
    const hasError = publisherError || booksError;
    const errorMessage = hasError ? 'Failed to load publisher data' : null;

    return {
      publisher: publisher || null,
      books: books || null,
      isLoading,
      hasError,
      errorMessage,
    };
  }, [publisher, books, publisherLoading, booksLoading, publisherError, booksError]);
};
