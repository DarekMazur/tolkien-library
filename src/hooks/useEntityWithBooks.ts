import { useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { TResponse } from '@/lib/types';

interface UseEntityWithBooksProps<E, B> {
  slug?: string;
  fetchEntity: (slug: string) => Promise<TResponse<E>>;
  fetchBooks: (id: string) => Promise<TResponse<B[]>>;
}

export const useEntityWithBooks = <E extends { id: string }, B>({
  slug,
  fetchEntity,
  fetchBooks,
}: UseEntityWithBooksProps<E, B>) => {
  const {
    data: entity,
    isError: entityError,
    isLoading: entityLoading,
  } = useApi(() => fetchEntity(slug!), { enabled: !!slug });

  const {
    data: books,
    isError: booksError,
    isLoading: booksLoading,
  } = useApi(() => fetchBooks(entity!.id), { enabled: !!entity?.id });

  return useMemo(
    () => ({
      entity: entity ?? null,
      books: books ?? null,
      isLoading: entityLoading || booksLoading,
      hasError: entityError || booksError,
      errorMessage: entityError || booksError ? 'An error occurred while downloading data.' : null,
    }),
    [entity, books, entityLoading, booksLoading, entityError, booksError],
  );
};
