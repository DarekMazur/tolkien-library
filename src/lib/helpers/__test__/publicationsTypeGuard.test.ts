import {
  isBook,
  isTranslator,
  isPublication,
  isFanzin,
  isFanEdition,
  isPublisher,
} from '../publicationsTypeGuard.ts';
import {
  IBookProps,
  ITranslatorProps,
  IPublicationProps,
  IFanzinProps,
  IFanEditionsProps,
  IPublisherProps,
  EPublicationType,
} from '@/lib/types';
import { faker } from '@faker-js/faker';

describe('Type guards', () => {
  describe('isBook', () => {
    it('should return true for an object that satisfies IBookProps (with a Polish title)', () => {
      const book: Partial<IBookProps> = {
        id: '1',
        polishTitle: 'Hobbit',
        originalTitle: null,
        author: null,
        translator: null,
        publisher: {
          id: 'p1',
          title: 'Wydawnictwo',
          description: 'Opis',
          createdAt: faker.date.past(),
        },
        year: 1937,
        publicationNumber: 1,
        cover: null,
        series: null,
        isbn: '123-456',
      };
      expect(isBook(book)).toBe(true);
    });

    it('should return false when the “polishTitle” key is missing or the argument is not an object', () => {
      expect(isBook({})).toBe(false);
      expect(isBook({ originalTitle: 'Tytuł' })).toBe(false);
      expect(isBook(null)).toBe(false);
      expect(isBook(undefined)).toBe(false);
      expect(isBook('napis')).toBe(false);
    });
  });

  describe('isTranslator', () => {
    it('should return true for an object that satisfies ITranslatorProps', () => {
      const translator: Partial<ITranslatorProps> = {
        id: 't1',
        firstName: 'Jan',
        lastName: 'Kowal',
        description: 'Opis tłumacza',
      };
      expect(isTranslator(translator)).toBe(true);
    });

    it('should return false when firstName or lastName is missing or the argument is not an object', () => {
      expect(isTranslator({ firstName: 'Jan' })).toBe(false);
      expect(isTranslator({ lastName: 'Kowal' })).toBe(false);
      expect(isTranslator({ description: 'Opis' })).toBe(false);
      expect(isTranslator(null)).toBe(false);
      expect(isTranslator(123)).toBe(false);
    });
  });

  describe('isPublication', () => {
    it('should return true for an object that implements IPublicationProps', () => {
      const pub: Partial<IPublicationProps> = {
        id: 'pub1',
        title: 'Artykuł',
        author: 'Tolkien',
        publisher: {
          id: 'p2',
          title: 'Wydawnictwo XYZ',
          description: 'Opis',
          createdAt: faker.date.past(),
        },
        year: '2025',
        description: 'Krótki opis',
        type: EPublicationType.EPUB,
      };
      expect(isPublication(pub)).toBe(true);
    });

    it('should return false if any of the author, description, or type keys are missing, or if the argument is not an object.', () => {
      expect(isPublication({ description: 'D', type: EPublicationType.PARTIAL })).toBe(false);
      expect(isPublication({ author: 'A', type: EPublicationType.PARTIAL })).toBe(false);
      expect(isPublication({ author: 'A', description: 'D' })).toBe(false);
      expect(isPublication(null)).toBe(false);
      expect(isPublication('tekst')).toBe(false);
    });
  });

  describe('isFanzin', () => {
    it('should return true for an object that satisfies IFanzinProps', () => {
      const fanzin: Partial<IFanzinProps> = {
        id: 'f1',
        title: 'Fanzin X',
        publisher: {
          id: 'p3',
          title: 'FanzinPub',
          description: 'Opis',
          createdAt: faker.date.past(),
        },
        startDate: new Date('2020-01-01'),
        lastIssueDate: new Date('2020-12-31'),
        numbers: 10,
      };
      expect(isFanzin(fanzin)).toBe(true);
    });

    it('should return false when startDate, lastIssueDate, or numbers are missing, or the argument is not an object.', () => {
      expect(isFanzin({ startDate: new Date(), numbers: 5 })).toBe(false);
      expect(isFanzin({ lastIssueDate: new Date(), numbers: 5 })).toBe(false);
      expect(isFanzin({ startDate: new Date(), lastIssueDate: new Date() })).toBe(false);
      expect(isFanzin(null)).toBe(false);
      expect(isFanzin(0)).toBe(false);
    });
  });

  describe('isFanEdition', () => {
    it('should return true for an object that satisfies IFanEditionsProps (with a title and without fanzine fields)', () => {
      const edition: Partial<IFanEditionsProps> = {
        id: 'e1',
        title: 'Specjalne wydanie',
        cover: 'cover.png',
        year: 2025,
        description: 'Opis edycji',
        isMumakil: true,
      };
      expect(isFanEdition(edition)).toBe(true);
    });

    it('should return false when the “title” key is missing or “startDate”, ‘isbn’ or “version” is present', () => {
      expect(isFanEdition({})).toBe(false);
      expect(isFanEdition({ title: 'Tytuł', startDate: new Date() })).toBe(false);
      expect(isFanEdition({ title: 'Tytuł', isbn: '123' })).toBe(false);
      expect(isFanEdition({ title: 'Tytuł', version: 'v1' })).toBe(false);
      expect(isFanEdition(null)).toBe(false);
    });
  });

  describe('isPublisher', () => {
    it('should return true for an object that satisfies IPublisherProps', () => {
      const publisher: Partial<IPublisherProps> = {
        id: 'p4',
        title: 'Wydawnictwo ABC',
        description: 'Opis wydawnictwa',
      };
      expect(isPublisher(publisher)).toBe(true);
    });

    it('should return false when there is no title/description or firstName/lastName exists, or the argument is not an object', () => {
      expect(isPublisher({ title: 'Tytuł' })).toBe(false);
      expect(isPublisher({ description: 'Opis' })).toBe(false);
      expect(isPublisher({ title: 'Tytuł', description: 'Opis', firstName: 'Jan' })).toBe(false);
      expect(isPublisher(null)).toBe(false);
      expect(isPublisher(123)).toBe(false);
    });
  });
});
