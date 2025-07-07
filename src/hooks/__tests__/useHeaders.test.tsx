import { renderHook } from '@testing-library/react';
import { useHeaders } from '../useHeaders';
import { IBookProps } from '@/lib/types';

const mockTranslator = {
  id: 'translator-1',
  lastName: 'Kowalski',
  firstName: 'Jan',
  description: '',
};

const mockPublisher = {
  id: 'publisher-1',
  title: 'Wydawnictwo ABC',
  description: '',
};

describe('useHeaders', () => {
  describe('when there is no element of the array', () => {
    it('should return an empty array of headers', () => {
      const { result } = renderHook(() => useHeaders(null as never));

      expect(result.current.headers).toEqual([]);
    });
  });

  describe('for books written by J.R.R. Tolkien', () => {
    const tolkienBook: IBookProps = {
      id: 'book-1',
      originalTitle: 'The Lord of the Rings',
      polishTitle: 'Władca Pierścieni',
      author: 'J.R.R. Tolkien',
      translator: mockTranslator,
      publisher: mockPublisher,
      year: 1954,
      publicationNumber: 1,
      cover: 'Twarda',
      series: 'Middle-earth',
      isbn: '978-0-261-10235-4',
    };

    it('should return all headings with additional ones for Tolkien', () => {
      const { result } = renderHook(() => useHeaders(tolkienBook));

      const expectedHeaders = [
        { displayTitle: 'Original Title', key: 'originalTitle' },
        { displayTitle: 'Polish Title', key: 'polishTitle' },
        { displayTitle: 'Translator', key: 'translator' },
        { displayTitle: 'Publisher', key: 'publisher' },
        { displayTitle: 'Year', key: 'year' },
        { displayTitle: 'Pub. no', key: 'publicationNumber' },
        { displayTitle: 'Cover', key: 'cover' },
        { displayTitle: 'Series', key: 'series' },
        { displayTitle: 'ISBN', key: 'isbn' },
      ];

      expect(result.current.headers).toEqual(expectedHeaders);
    });

    it('should not include the heading “Author” for Tolkien', () => {
      const { result } = renderHook(() => useHeaders(tolkienBook));

      const authorHeader = result.current.headers.find((header) => header.key === 'author');

      expect(authorHeader).toBeUndefined();
    });
  });

  describe('for books by other authors', () => {
    const otherAuthorBook: IBookProps = {
      id: 'book-2',
      originalTitle: 'Dune',
      polishTitle: 'Diuna',
      author: 'Frank Herbert',
      translator: mockTranslator,
      publisher: mockPublisher,
      year: 1965,
      publicationNumber: 2,
      cover: null,
      series: null,
      isbn: '978-0-441-17271-9',
    };

    it('should include an “Author” heading for other authors', () => {
      const { result } = renderHook(() => useHeaders(otherAuthorBook));

      const authorHeader = result.current.headers.find((header) => header.key === 'author');

      expect(authorHeader).toBeDefined();
      expect(authorHeader).toEqual({
        displayTitle: 'Author',
        key: 'author',
      });
    });

    it('should not include the headings “Cover”, ‘Series’, “Translator” for other authors', () => {
      const { result } = renderHook(() => useHeaders(otherAuthorBook));

      const coverHeader = result.current.headers.find((header) => header.key === 'cover');
      const seriesHeader = result.current.headers.find((header) => header.key === 'series');
      const translatorHeader = result.current.headers.find((header) => header.key === 'translator');

      expect(coverHeader).toBeUndefined();
      expect(seriesHeader).toBeUndefined();
      expect(translatorHeader).toBeUndefined();
    });
  });

  describe('property filtering', () => {
    it('should omit properties that do not exist in the object', () => {
      const bookWithMissingProps: Partial<IBookProps> = {
        id: 'book-3',
        polishTitle: 'Tytuł książki',
        author: 'Autor',
        year: 2020,
        isbn: '978-123-456-789-0',
      };

      const { result } = renderHook(() => useHeaders(bookWithMissingProps as IBookProps));

      const expectedKeys = ['polishTitle', 'author', 'year', 'isbn'];
      const actualKeys = result.current.headers.map((header) => header.key);

      expectedKeys.forEach((key) => {
        expect(actualKeys).toContain(key);
      });

      expect(actualKeys).not.toContain('originalTitle');
      expect(actualKeys).not.toContain('translator');
      expect(actualKeys).not.toContain('publisher');
    });
  });

  describe('memoization', () => {
    it('should return the same reference for the same object', () => {
      const book: IBookProps = {
        id: 'book-4',
        originalTitle: 'Test Book',
        polishTitle: 'Książka Testowa',
        author: 'Test Author',
        translator: mockTranslator,
        publisher: mockPublisher,
        year: 2023,
        publicationNumber: 1,
        cover: 'Miękka',
        series: 'Test Series',
        isbn: '978-000-000-000-0',
      };

      const { result, rerender } = renderHook(({ bookData }) => useHeaders(bookData), {
        initialProps: { bookData: book },
      });

      const firstResult = result.current.headers;

      rerender({ bookData: book });

      const secondResult = result.current.headers;

      expect(firstResult).toBe(secondResult);
    });

    it('should return a new reference for different objects', () => {
      const book1: IBookProps = {
        id: 'book-5',
        originalTitle: 'Book 1',
        polishTitle: 'Książka 1',
        author: 'Author 1',
        translator: mockTranslator,
        publisher: mockPublisher,
        year: 2023,
        publicationNumber: 1,
        cover: 'Twarda',
        series: 'Series 1',
        isbn: '978-111-111-111-1',
      };

      const book2: IBookProps = {
        ...book1,
        id: 'book-6',
        originalTitle: 'Book 2',
        polishTitle: 'Książka 2',
      };

      const { result, rerender } = renderHook(({ bookData }) => useHeaders(bookData), {
        initialProps: { bookData: book1 },
      });

      const firstResult = result.current.headers;

      rerender({ bookData: book2 });

      const secondResult = result.current.headers;

      expect(firstResult).not.toBe(secondResult);
    });
  });

  describe('order of headings', () => {
    it('should return the headers in the specified order', () => {
      const book: IBookProps = {
        id: 'book-7',
        originalTitle: 'Test',
        polishTitle: 'Test PL',
        author: 'J.R.R. Tolkien',
        translator: mockTranslator,
        publisher: mockPublisher,
        year: 2023,
        publicationNumber: 1,
        cover: 'Twarda',
        series: 'Test Series',
        isbn: '978-000-000-000-0',
      };

      const { result } = renderHook(() => useHeaders(book));

      const expectedOrder = [
        'originalTitle',
        'polishTitle',
        'translator',
        'publisher',
        'year',
        'publicationNumber',
        'cover',
        'series',
        'isbn',
      ];

      const actualOrder = result.current.headers.map((header) => header.key);

      expect(actualOrder).toEqual(expectedOrder);
    });
  });
});
