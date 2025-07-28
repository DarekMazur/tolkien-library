import { getBooksByTranslator, getTranslatorBySlug } from '@/lib/getDataFromApi';
import { IBookProps, ITranslatorProps } from '@/lib/types';
import { useEntityWithBooks } from '@/hooks/useEntityWithBooks.ts';

/**
 * Custom React hook for fetching translator data along with associated books.
 *
 * This hook leverages the generic `useEntityWithBooks` hook to provide
 * translator-specific data fetching functionality. It retrieves translator
 * information by slug and fetches all books associated with that translator.
 *
 * @param {string} [slug] - The unique slug identifier for the translator.
 *                         If not provided, the hook will not fetch any data.
 *
 * @returns {Object} Hook return object containing:
 * @returns {ITranslatorProps | null} returns.entity - The translator data object
 *                                                    or null if not found/loading
 * @returns {IBookProps[]} returns.books - Array of books associated with the translator
 * @returns {boolean} returns.isLoading - Loading state indicator
 * @returns {Error | null} returns.error - Error object if fetch failed, null otherwise
 * @returns {() => void} returns.refetch - Function to manually refetch the data
 *
 * @example
 * ```
 * const TranslatorProfile = ({ translatorSlug }: { translatorSlug: string }) => {
 *   const { entity: translator, books, isLoading, error } = useTranslatorData(translatorSlug);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!translator) return <div>Translator not found</div>;
 *
 *   return (
 *     <div>
 *       <h1>{translator.name}</h1>
 *       <p>Books translated: {books.length}</p>
 *       {books.map(book => (
 *         <div key={book.id}>{book.title}</div>
 *       ))}
 *     </div>
 *   );
 * };
 * ```
 *
 * @see {@link useEntityWithBooks} - The generic hook this is based on
 * @see {@link getTranslatorBySlug} - API function for fetching translator data
 * @see {@link getBooksByTranslator} - API function for fetching translator's books
 *
 * @since 1.0.0
 */
export const useTranslatorData = (slug?: string) =>
  useEntityWithBooks<ITranslatorProps, IBookProps>({
    slug,
    fetchEntity: getTranslatorBySlug,
    fetchBooks: getBooksByTranslator,
  });
