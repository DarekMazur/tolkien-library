import { describe, it, expect } from 'vitest';
import { FanzinTableStrategy } from '../FanzinTableStrategy';
import type { IFanzinProps } from '@/lib/types';

const sampleItem: IFanzinProps = {
  id: '1',
  title: 'Fanzin A',
  version: 'v1.0',
  publisher: {
    title: 'Publisher X',
    id: 'pub1',
    description: '',
  },
  numbers: 5,
  startDate: new Date('2020-01-01'),
  lastIssueDate: new Date('2021-12-31'),
};

const sampleItemNoLast: IFanzinProps = {
  ...sampleItem,
  lastIssueDate: null,
};

describe('FanzinTableStrategy', () => {
  const strategy = new FanzinTableStrategy();

  describe('getAliases()', () => {
    it('should return aliases as defined by', () => {
      const aliases = strategy.getAliases();
      expect(aliases).toEqual({ publisher: 'publisher.title' });
    });
  });

  describe('getHeaders()', () => {
    it('should return the correct headers for the full object', () => {
      const headers = strategy.getHeaders(sampleItem);
      const labels = headers.map((h) => h.displayTitle);
      expect(labels).toEqual([
        'Title',
        'Version',
        'Publisher',
        'Numbers count',
        'From',
        'Last number',
      ]);
      const keys = headers.map((h) => h.key);
      expect(keys).toEqual([
        'title',
        'version',
        'publisher.title',
        'numbers',
        'startDate',
        'lastIssueDate',
      ]);
    });

    it('should skip the header with the condition when lastIssueDate is null', () => {
      const headers = strategy.getHeaders(sampleItemNoLast);
      const labels = headers.map((h) => h.displayTitle);
      expect(labels).toEqual(['Title', 'Version', 'Publisher', 'Numbers count', 'From']);
      expect(headers.some((h) => h.key === 'lastIssueDate')).toBe(false);
    });

    it('should omit properties that do not exist in the object', () => {
      type PartialProps = Omit<IFanzinProps, 'numbers' | 'publisher'>;
      const partial: PartialProps = {
        id: '2',
        title: 'B',
        version: 'v2',
        startDate: new Date('2021-01-01'),
        lastIssueDate: null,
      };
      // @ts-expect-error: publisher and numbers omitted
      const headers = strategy.getHeaders(partial);
      const keys = headers.map((h) => h.key);
      expect(keys).toEqual(['title', 'version', 'startDate']);
    });
  });

  describe('getDisplayValue()', () => {
    it('should return a simple value for the root key', () => {
      const value = strategy.getDisplayValue(sampleItem, 'title');
      expect(value).toBe('Fanzin A');
    });

    it('should return a nested value for a key with a period', () => {
      const value = strategy.getDisplayValue(sampleItem, 'publisher.title');
      expect(value).toBe('Publisher X');
    });

    it('should return null when parent is null or no childKey', () => {
      const value1 = strategy.getDisplayValue(sampleItemNoLast, 'publisher.id');
      expect(value1).toBe('pub1');

      // @ts-expect-error: invalid key
      const broken = strategy.getDisplayValue(sampleItem, 'publisher.invalid');
      expect(broken).toBeNull();
    });

    it('should return undefined for a non-existent key', () => {
      // @ts-expect-error: non existent key
      const non = strategy.getDisplayValue(sampleItem, 'nonexistent');
      expect(non).toBeUndefined();
    });
  });
});
