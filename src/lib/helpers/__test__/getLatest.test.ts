import { getLatest } from '../getLatest';
import {
  isBook,
  isTranslator,
  isPublication,
  isFanzin,
  isFanEdition,
  isPublisher,
} from '../publicationsTypeGuard';
import {
  IBookProps,
  ITranslatorProps,
  IPublicationProps,
  IFanzinProps,
  IFanEditionsProps,
  IPublisherProps,
  TPublications,
  EPublicationType,
} from '@/lib/types';
import { faker } from '@faker-js/faker';

describe('getLatest', () => {
  it('should return polishTitle for the book', () => {
    const book: IBookProps = {
      id: '1',
      originalTitle: 'Original',
      polishTitle: 'Tytuł',
      author: 'Autor',
      translator: null,
      publisher: {
        id: 'p1',
        title: 'Wydawnictwo',
        description: 'Desc',
        createdAt: faker.date.past(),
      },
      year: 2021,
      publicationNumber: 1,
      cover: null,
      series: null,
      isbn: '123',
      createdAt: faker.date.past(),
    };

    expect(isBook(book)).toBe(true);
    expect(getLatest(book as TPublications)).toBe('Tytuł');
  });

  it('should return the name and surname for the translator', () => {
    const translator: ITranslatorProps = {
      id: 't1',
      firstName: 'Jan',
      lastName: 'Kowalski',
      description: 'Opisy',
      createdAt: faker.date.past(),
    };

    expect(isTranslator(translator)).toBe(true);
    expect(getLatest(translator)).toBe('Jan Kowalski');
  });

  it('should return the title for the publication', () => {
    const publication: IPublicationProps = {
      id: 'pub1',
      title: 'Artykuł',
      author: 'Autor',
      publisher: {
        id: 'p2',
        title: 'Wyd',
        description: 'Desc',
        createdAt: faker.date.past(),
      },
      year: '2020',
      description: 'Opis',
      type: EPublicationType.EPUB,
      isbn: null,
      issn: 'ISSN1234',
      createdAt: faker.date.past(),
    };

    expect(isPublication(publication)).toBe(true);
    expect(getLatest(publication as TPublications)).toBe('Artykuł');
  });

  it('should return the title for the fanzine', () => {
    const fanzin: IFanzinProps = {
      id: 'f1',
      title: 'FanzinX',
      version: 'v1',
      publisher: {
        id: 'p3',
        title: 'Wyd',
        description: 'Desc',
        createdAt: faker.date.past(),
      },
      numbers: 5,
      startDate: new Date('2021-01-01'),
      lastIssueDate: null,
      createdAt: faker.date.past(),
    };

    expect(isFanzin(fanzin)).toBe(true);
    expect(getLatest(fanzin as TPublications)).toBe('FanzinX');
  });

  it('should return the title for the fan edition', () => {
    const fanEdition: IFanEditionsProps = {
      id: 'fe1',
      title: 'Wydanie fanowskie',
      cover: undefined,
      year: 2022,
      description: 'Desc',
      isMumakil: false,
      createdAt: faker.date.past(),
    };

    expect(isFanEdition(fanEdition)).toBe(true);
    expect(getLatest(fanEdition as TPublications)).toBe('Wydanie fanowskie');
  });

  it('should return the title to the publisher', () => {
    const publisher: IPublisherProps = {
      id: 'p4',
      title: 'Moje Wydawnictwo',
      description: 'Opis',
      createdAt: faker.date.past(),
    };

    expect(isPublisher(publisher)).toBe(true);
    expect(getLatest(publisher as TPublications)).toBe('Moje Wydawnictwo');
  });

  it('should return null for undefined', () => {
    expect(getLatest(undefined)).toBeNull();
  });

  it('should return null for a non-standard object', () => {
    const unknownObj = { foo: 'bar' };
    expect(getLatest(unknownObj as unknown as TPublications)).toBeNull();
  });
});
