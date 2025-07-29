import { IBookProps, IPublisherProps } from '@/lib/types';
import { getBooksByPublisher, getPublisherBySlug } from '@/lib/getDataFromApi';
import { useEntityWithBooks } from '@/hooks/useEntityWithBooks';

/**
 * Custom hook for fetching publisher data along with associated books.
 *
 * @param {string} [slug] - The publisher slug identifier used to fetch publisher data
 * @returns {ReturnType<typeof useEntityWithBooks<IPublisherProps, IBookProps>>} Publisher data and books with loading states
 *
 * @example
 * ```
 * const { entity: publisher, books, isLoading, error } = usePublisherData('tolkien-books');
 * ```
 */
export const usePublisherData = (slug?: string) =>
  useEntityWithBooks<IPublisherProps, IBookProps>({
    slug,
    fetchEntity: getPublisherBySlug,
    fetchBooks: getBooksByPublisher,
  });
