import { useApi } from '@/hooks/useApi';
import {
  getCategoryBySlug,
  getBooksByAuthor,
  getAllPublications,
  getAllOnline,
} from '@/lib/getDataFromApi';
import { ETableType } from '@/lib/types';
import { useLibraryParams } from './useLibraryParams';

/**
 * Custom hook for fetching and managing library data based on URL parameters.
 *
 * This hook orchestrates data fetching for different types of library publications
 * (books, articles, online resources, categories) based on the current URL parameters.
 * It uses the useLibraryParams hook to extract routing information and conditionally
 * fetches appropriate data using the useApi hook.
 *
 * @typedef {Object} InvalidState
 * @property {'invalid'} state - Indicates invalid URL parameters
 *
 * @typedef {Object} LoadingState
 * @property {'loading'} state - Indicates data is being fetched
 *
 * @typedef {Object} ErrorState
 * @property {'error'} state - Indicates an error occurred during data fetching
 *
 * @typedef {Object} EmptyState
 * @property {'empty'} state - Indicates no data to fetch for current parameters
 * @property {ETableType} type - The publication type from URL parameters
 *
 * @typedef {Object} BooksState
 * @property {'books'} state - Successfully fetched books data
 * @property {Array} data - Array of book objects from J.R.R. Tolkien
 * @property {ETableType} type - The publication type (ETableType.BOOK)
 * @property {string | null} search - Search query parameter for filtering books
 *
 * @typedef {Object} PublicationsState
 * @property {'publications'} state - Successfully fetched publications data
 * @property {Array} data - Array of publication objects
 * @property {ETableType} type - The publication type (ETableType.ARTICLE)
 *
 * @typedef {Object} OnlineState
 * @property {'online'} state - Successfully fetched online resources data
 * @property {Array} data - Array of online resource objects
 * @property {ETableType} type - The publication type (ETableType.ONLINE)
 *
 * @typedef {Object} CategoryState
 * @property {'category'} state - Successfully fetched category data
 * @property {Object} data - Category object retrieved by slug
 * @property {ETableType} type - The publication type
 *
 * @returns {InvalidState | LoadingState | ErrorState | EmptyState | BooksState | PublicationsState | OnlineState | CategoryState}
 * A discriminated union representing the current state of data fetching and the associated data.
 * The return type is determined by the URL parameters and the current fetch status.
 *
 * @example
 * // URL: /books?search=hobbit
 * const result = useLibraryData();
 * if (result.state === 'books') {
 *   console.log(result.data); // Array of Tolkien books
 *   console.log(result.search); // 'hobbit'
 * }
 *
 * @example
 * // URL: /articles
 * const result = useLibraryData();
 * if (result.state === 'publications') {
 *   console.log(result.data); // Array of articles
 * }
 *
 * @example
 * // URL: /invalid-type
 * const result = useLibraryData();
 * // result.state === 'invalid'
 *
 * @example
 * // URL: /categories/fantasy
 * const result = useLibraryData();
 * if (result.state === 'category') {
 *   console.log(result.data); // Category object for 'fantasy'
 * }
 *
 * @requires useLibraryParams - Custom hook for extracting URL parameters
 * @requires useApi - Custom hook for API data fetching
 * @requires @/lib/getDataFromApi - API functions for different data types
 * @requires @/lib/types - ETableType enum
 *
 * @see {@link useLibraryParams} - For URL parameter extraction logic
 * @see {@link useApi} - For API data fetching patterns
 *
 * @throws {Error} When API calls fail, returns state 'error' instead of throwing
 *
 * @note This hook specifically fetches J.R.R. Tolkien books when type is BOOK.
 *       The search parameter 'jrrt' is used to exclude/include Tolkien-specific results.
 *
 * @note Categories are only fetched when type is not BOOK, ARTICLE, or ONLINE and a slug is present.
 *
 * @performance The hook uses conditional API calls to avoid unnecessary network requests.
 *              Only the relevant API endpoint is called based on the current URL parameters.
 */

export const useLibraryData = () => {
  const { type, slug, search, isValid } = useLibraryParams();

  if (!isValid) return { state: 'invalid' as const };

  const shouldFetchBooks = type === ETableType.BOOK;
  const shouldFetchArticles = type === ETableType.ARTICLE;
  const shouldFetchOnline = type === ETableType.ONLINE;
  const shouldFetchCategory =
    type !== ETableType.BOOK && type !== ETableType.ARTICLE && type !== ETableType.ONLINE && !!slug;

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
    return { state: 'books' as const, data: books!, type, search };
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
