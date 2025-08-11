import { TPublications } from '@/lib/types';
import {
  isBook,
  isFanEdition,
  isFanzin,
  isPublication,
  isPublisher,
  isTranslator,
} from '@/lib/helpers/publicationsTypeGuard.ts';

/**
 * Returns the latest relevant title or name from the provided entry data.
 *
 * - If the entry is a Book, returns its Polish title.
 * - If the entry is a Translator, returns their full name (first and last name).
 * - If the entry is a Publication, Fanzin, Fan Edition, or Publisher, returns its title.
 *
 * @param {TPublications | undefined} entryData - The publication entry to get the latest title or name from.
 * @returns {string | null} The latest title or full name based on entry type, or null if none matches.
 */

export const getLatest = (entryData: TPublications | undefined) => {
  if (isBook(entryData)) {
    return entryData.polishTitle;
  }

  if (isTranslator(entryData)) {
    return `${entryData.firstName} ${entryData.lastName}`;
  }

  if (
    isPublication(entryData) ||
    isFanzin(entryData) ||
    isFanEdition(entryData) ||
    isPublisher(entryData)
  ) {
    return entryData.title;
  }

  return null;
};
