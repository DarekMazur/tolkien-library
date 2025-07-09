import { describe, it, expect } from 'vitest';
import { BookTableStrategy } from '@/lib/strategies/BookTableStrategy';
import type { IBookProps } from '@/lib/types';

describe('BookTableStrategy', () => {
  const strategy = new BookTableStrategy();

  const baseItem: IBookProps = {
    id: '1',
    originalTitle: 'The Hobbit',
    polishTitle: 'Hobbit, czyli tam i z powrotem',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Stanisław',
      lastName: 'Barańczak',
      description: '',
      id: 'sb',
    },
    publisher: {
      title: 'Allen & Unwin',
      description: '',
      id: 'au',
    },
    year: 1937,
    publicationNumber: 1,
    cover: 'hardcover',
    series: 'Middle-earth',
    isbn: '978-0261102217',
  };

  it('should return the aliases', () => {
    expect(strategy.getAliases()).toEqual({
      translator: 'translator',
      publisher: 'publisher.title',
    });
  });

  describe('getHeaders()', () => {
    it('Returns all headers without filters when author ≠ Tolkien', () => {
      const item = { ...baseItem, author: 'George R.R. Martin' };
      const headers = strategy.getHeaders(item);
      const keys = headers.map((h) => h.key);
      expect(keys).toEqual([
        'originalTitle',
        'polishTitle',
        'author',
        'publisher.title',
        'year',
        'publicationNumber',
        'isbn',
      ]);
    });

    it('returns headlines with translator and cover for Tolkien', () => {
      const item = { ...baseItem, author: 'J.R.R. Tolkien' };
      const headers = strategy.getHeaders(item);
      const keys = headers.map((h) => h.key);
      expect(keys).toEqual([
        'originalTitle',
        'polishTitle',
        'translator',
        'publisher.title',
        'year',
        'publicationNumber',
        'cover',
        'series',
        'isbn',
      ]);
    });

    it('removed author when condition author === Tolkien', () => {
      const item = { ...baseItem, author: 'J.R.R. Tolkien' };
      const headers = strategy.getHeaders(item);
      expect(headers.some((h) => h.key === 'author')).toBe(false);
    });

    it('Translator removed when condition author !== Tolkien not met', () => {
      const item = { ...baseItem, author: 'Ursula K. Le Guin' };
      const headers = strategy.getHeaders(item);
      expect(headers.some((h) => h.key === 'translator')).toBe(false);
    });
  });

  describe('getDisplayValue()', () => {
    it('returns the value of a simple property', () => {
      expect(strategy.getDisplayValue(baseItem, 'year')).toBe(1937);
      expect(strategy.getDisplayValue(baseItem, 'isbn')).toBe('978-0261102217');
    });

    it('returns the value of the nested publisher.title property', () => {
      expect(strategy.getDisplayValue(baseItem, 'publisher.title')).toBe('Allen & Unwin');
    });

    it('returns null for a non-existent nested key', () => {
      expect(strategy.getDisplayValue(baseItem, 'publisher.nonexistent' as never)).toBeNull();
    });

    it('returns null when parentKey is not an object', () => {
      const modified = { ...baseItem, publisher: null as never };
      expect(strategy.getDisplayValue(modified, 'publisher.title')).toBeNull();
    });
  });
});
