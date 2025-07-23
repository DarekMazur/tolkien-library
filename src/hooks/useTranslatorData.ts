import { useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { getBooksByTranslator, getTranslatorBySlug } from '@/lib/getDataFromApi';
import { IBookProps, ITranslatorProps } from '@/lib/types';

/**
 * Return type for the useTranslatorData hook.
 *
 * @interface UseTranslatorDataResult
 * @property {ITranslatorProps | null} translator - Translator data object or null
 * @property {IBookProps[] | null} books - Array of books or null
 * @property {boolean} isLoading - Loading state indicator
 * @property {boolean} hasError - Error state indicator
 * @property {string | null} errorMessage - Error message or null
 */

interface UseTranslatorDataResult {
  translator: ITranslatorProps | null;
  books: IBookProps[] | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

/**
 * Custom React hook for fetching translator data and associated books.
 *
 * This hook manages the loading state and error handling for fetching both
 * translator information by slug and all books associated with that translator.
 * It uses the useApi hook internally to handle data fetching operations.
 *
 * @param {string} [slug] - The unique slug identifier for the translator.
 *                         If not provided, the hook will not fetch translator data.
 *
 * @returns {UseTranslatorDataResult} An object containing:
 * - translator: The translator data or null if not loaded/error occurred
 * - books: Array of books by the translator or null if not loaded/error occurred
 * - isLoading: Boolean indicating if any data is currently being fetched
 * - hasError: Boolean indicating if any error occurred during fetching
 * - errorMessage: Error message string or null if no error occurred
 *
 * @example
 * ```
 * const { translator, books, isLoading, hasError } = useTranslatorData('tolkien-slug');
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (hasError) return <div>Error loading data</div>;
 * if (!translator) return <div>Translator not found</div>;
 *
 * return (
 *   <div>
 *     <h1>{translator.name}</h1>
 *     {books?.map(book => <div key={book.id}>{book.title}</div>)}
 *   </div>
 * );
 * ```
 *
 * @example
 * ```
 * // Hook without slug - will not fetch data
 * const { isLoading } = useTranslatorData(); // isLoading will be false
 * ```
 *
 */

export const useTranslatorData = (slug?: string): UseTranslatorDataResult => {
  const {
    data: translator,
    isError: translatorError,
    isLoading: translatorLoading,
  } = useApi(() => getTranslatorBySlug(slug!), {
    enabled: !!slug,
  });

  const {
    data: books,
    isError: booksError,
    isLoading: booksLoading,
  } = useApi(() => getBooksByTranslator(translator!.id), {
    enabled: !!translator?.id,
  });

  return useMemo(() => {
    const isLoading = translatorLoading || booksLoading;
    const hasError = translatorError || booksError;
    const errorMessage = hasError ? 'Failed to load translator data' : null;

    return {
      translator: translator || null,
      books: books || null,
      isLoading,
      hasError,
      errorMessage,
    };
  }, [translator, books, translatorLoading, booksLoading, translatorError, booksError]);
};
