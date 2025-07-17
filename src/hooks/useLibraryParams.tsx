import { useLocation, useParams } from 'react-router';
import { ETableType } from '@/lib/types';

/**
 * Custom hook for extracting and validating library parameters from URL routing.
 *
 * This hook extracts the publication type and slug from URL parameters,
 * validates the type against the ETableType enum, and processes
 * search parameters from the current location.
 *
 * @returns {Object} An object containing validated URL parameters
 * @returns {ETableType | null} returns.type - The validated publication type from URL parameter (with last character removed), or null if invalid
 * @returns {string | null} returns.slug - The optional slug parameter from URL, or null if not present
 * @returns {string | null} returns.search - The search query string from URL search parameters (without leading '?'), or null if empty
 * @returns {boolean} returns.isValid - Indicates whether the extracted type parameter is valid according to ETableType enum
 *
 * @example
 * // URL: /books/fantasy-novel?query=tolkien
 * const { type, slug, search, isValid } = useLibraryParams();
 * // type: ETableType.BOOK (if 'books' maps to valid enum value)
 * // slug: 'fantasy-novel'
 * // search: 'query=tolkien'
 * // isValid: true
 *
 * @example
 * // URL: /invalid-type
 * const { type, slug, search, isValid } = useLibraryParams();
 * // type: null
 * // slug: null
 * // search: null
 * // isValid: false
 *
 * @requires react-router - useLocation, useParams
 * @requires @/lib/types - ETableType enum
 *
 */

export const useLibraryParams = (): {
  type: ETableType | null;
  slug: string | null;
  search: string | null;
  isValid: string | boolean | undefined;
} => {
  const { type, slug } = useParams<{ type: string; slug?: string }>();
  const location = useLocation();

  const isValidType =
    type &&
    Object.values(ETableType).includes(
      type.endsWith('s') ? (type.slice(0, -1) as ETableType) : (type as ETableType),
    );

  return {
    type: isValidType
      ? type.endsWith('s')
        ? (type.slice(0, -1) as ETableType)
        : (type as ETableType)
      : null,
    slug: slug || null,
    search: location.search.slice(1) || null,
    isValid: !!isValidType,
  };
};
