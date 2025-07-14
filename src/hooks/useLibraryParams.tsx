import { useLocation, useParams } from 'react-router';
import { EPublicationType } from '@/lib/types';

/**
 * Custom hook for extracting and validating library parameters from URL routing.
 *
 * This hook extracts the publication type and slug from URL parameters,
 * validates the type against the EPublicationType enum, and processes
 * search parameters from the current location.
 *
 * @returns {Object} An object containing validated URL parameters
 * @returns {EPublicationType | null} returns.type - The validated publication type from URL parameter (with last character removed), or null if invalid
 * @returns {string | null} returns.slug - The optional slug parameter from URL, or null if not present
 * @returns {string | null} returns.search - The search query string from URL search parameters (without leading '?'), or null if empty
 * @returns {boolean} returns.isValid - Indicates whether the extracted type parameter is valid according to EPublicationType enum
 *
 * @example
 * // URL: /books/fantasy-novel?query=tolkien
 * const { type, slug, search, isValid } = useLibraryParams();
 * // type: EPublicationType.BOOK (if 'books' maps to valid enum value)
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
 * @requires @/lib/types - EPublicationType enum
 *
 */

export const useLibraryParams = (): {
  type: EPublicationType | null;
  slug: string | null;
  search: string | null;
  isValid: string | boolean | undefined;
} => {
  const { type, slug } = useParams<{ type: string; slug?: string }>();
  const location = useLocation();

  const isValidType =
    type && Object.values(EPublicationType).includes(type.slice(0, -1) as EPublicationType);

  return {
    type: isValidType ? (type.slice(0, -1) as EPublicationType) : null,
    slug: slug || null,
    search: location.search.slice(1) || null,
    isValid: isValidType,
  };
};
