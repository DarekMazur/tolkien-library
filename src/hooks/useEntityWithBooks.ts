import { useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { TResponse } from '@/lib/types';

/**
 * Props for the useEntityWithBooks hook.
 *
 * @template E - Entity type that must extend an object with an `id` property
 * @template B - Book type
 */
interface UseEntityWithBooksProps<E, B> {
  slug?: string;
  fetchEntity: (slug: string) => Promise<TResponse<E>>;
  fetchBooks: (id: string) => Promise<TResponse<B[]>>;
}

/**
 * Custom hook for fetching an entity and its associated books.
 *
 * This hook manages the sequential loading of an entity (based on slug) and its related books.
 * It handles loading states, error states, and provides a unified interface for accessing
 * both the entity and its books data.
 *
 * @template E - Entity type that must have an `id` property of type string
 * @template B - Book type (can be any structure)
 *
 * @param props - Configuration object for the hook
 * @param props.slug - Optional slug identifier for the entity. If not provided, entity fetch is disabled
 * @param props.fetchEntity - Async function that fetches entity data by slug
 * @param props.fetchBooks - Async function that fetches books array by entity ID
 *
 * @returns Object containing:
 *   - `entity`: The fetched entity data or null if not available
 *   - `books`: Array of books associated with the entity or null if not available
 *   - `isLoading`: Boolean indicating if either entity or books are currently loading
 *   - `hasError`: Boolean indicating if any error occurred during fetching
 *   - `errorMessage`: Error message string or null if no errors occurred
 *
 * @example
 * ```
 * // Usage with Author entity and Book types
 * const { entity: author, books, isLoading, hasError } = useEntityWithBooks({
 *   slug: 'tolkien',
 *   fetchEntity: fetchAuthorBySlug,
 *   fetchBooks: fetchBooksByAuthorId
 * });
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (hasError) return <ErrorMessage />;
 *
 * return (
 *   <div>
 *     <h1>{author?.name}</h1>
 *     <BooksList books={books} />
 *   </div>
 * );
 * ```
 *
 * @remarks
 * - The hook uses sequential loading: books are only fetched after the entity is successfully loaded
 * - Both API calls are managed by the `useApi` hook with appropriate enabling conditions
 * - The return value is memoized to prevent unnecessary re-renders
 * - Error handling is unified - any error in either request will set `hasError` to true
 */
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
