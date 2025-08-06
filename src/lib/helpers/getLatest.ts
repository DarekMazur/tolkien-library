import { TPublications } from '@/lib/types';
import {
  isBook,
  isFanEdition,
  isFanzin,
  isPublication,
  isPublisher,
  isTranslator,
} from '@/lib/helpers/publicationsTypeGuard.ts';

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
