import { useMemo } from 'react';
import { IBookProps, TAllowedPaths } from '@/lib/types';

export const useHeaders = (arrayElement: IBookProps) => {
  const headers = useMemo(() => {
    if (!arrayElement) {
      return [];
    }

    const propertyOrder: Exclude<keyof IBookProps, 'id'>[] = [
      'originalTitle',
      'polishTitle',
      'author',
      'translator',
      'publisher',
      'year',
      'publicationNumber',
      'cover',
      'series',
      'isbn',
    ];

    const headerConfig: Record<
      Exclude<keyof IBookProps, 'id'>,
      { displayTitle: string; key: TAllowedPaths; condition?: boolean }
    > = {
      originalTitle: { displayTitle: 'Original Title', key: 'originalTitle' },
      polishTitle: { displayTitle: 'Polish Title', key: 'polishTitle' },
      author: {
        displayTitle: 'Author',
        key: 'author',
        condition: arrayElement.author !== 'J.R.R. Tolkien',
      },
      year: { displayTitle: 'Year', key: 'year' },
      publicationNumber: {
        displayTitle: 'Pub. no',
        key: 'publicationNumber',
      },
      cover: {
        displayTitle: 'Cover',
        key: 'cover',
        condition: arrayElement.author === 'J.R.R. Tolkien',
      },
      series: {
        displayTitle: 'Series',
        key: 'series',
        condition: arrayElement.author === 'J.R.R. Tolkien',
      },
      isbn: { displayTitle: 'ISBN', key: 'isbn' },
      translator: {
        displayTitle: 'Translator',
        key: 'translator',
        condition: arrayElement.author === 'J.R.R. Tolkien',
      },
      publisher: { displayTitle: 'Publisher', key: 'publisher' },
    };

    return propertyOrder
      .filter((prop) => prop in arrayElement)
      .filter((prop) => headerConfig[prop].condition !== false)
      .map((prop) => ({
        displayTitle: headerConfig[prop].displayTitle,
        key: headerConfig[prop].key,
      }));
  }, [arrayElement]);

  return { headers };
};
