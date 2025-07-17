import { describe, it, expect } from 'vitest';
import { FanEditionTableStrategy } from '../FanEditionTableStrategy';
import { IFanEditionsProps } from '@/lib/types';

describe('FanEditionTableStrategy', () => {
  let strategy: FanEditionTableStrategy;

  beforeEach(() => {
    strategy = new FanEditionTableStrategy();
  });

  describe('getAliases', () => {
    it('should return an empty alias object', () => {
      const aliases = strategy.getAliases();
      expect(aliases).toEqual({});
      expect(Object.keys(aliases)).toHaveLength(0);
    });
  });

  describe('getHeaders', () => {
    const baseItem: IFanEditionsProps = {
      id: '1',
      cover: 'img.png',
      title: 'Title',
      year: 2025,
      description: 'Desc',
      isMumakil: false,
    };

    it('should return all available headers in a fixed order', () => {
      const headers = strategy.getHeaders(baseItem);
      const keys = headers.map((h) => h.key);
      expect(keys).toEqual(['cover', 'title', 'year', 'description']);
      expect(headers.map((h) => h.displayTitle)).toEqual(['Cover', 'Title', 'Year', 'Description']);
    });

    it('should omit headers that are not present in the object', () => {
      const item: IFanEditionsProps = {
        id: '2',
        title: 'Only title',
        isMumakil: true,
      };
      const headers = strategy.getHeaders(item);
      expect(headers.map((h) => h.key)).toEqual(['title']);
    });

    it('should respect the optional conditions', () => {
      const customStrategy = new FanEditionTableStrategy();
      customStrategy.getHeaders = (item) => {
        const defs = strategy.getHeaders(item);
        return defs
          .map((d) =>
            d.key === 'year'
              ? { ...d, condition: (it: IFanEditionsProps) => Number(it.year) > 2030 }
              : d,
          )
          .filter((d) => !d.condition || d.condition(item));
      };
      const futureItem = { ...baseItem, year: 2040 };
      const pastItem = { ...baseItem, year: 2020 };
      expect(customStrategy.getHeaders(futureItem).some((h) => h.key === 'year')).toBe(true);
      expect(customStrategy.getHeaders(pastItem).some((h) => h.key === 'year')).toBe(false);
    });
  });

  describe('getDisplayValue', () => {
    const baseItem: IFanEditionsProps = {
      id: '1',
      cover: 'img.png',
      title: 'Title',
      year: 2025,
      description: 'Desc',
      isMumakil: false,
    };

    it('should return a value for the shallow key', () => {
      expect(strategy.getDisplayValue(baseItem, 'title')).toBe('Title');
      expect(strategy.getDisplayValue(baseItem, 'year')).toBe(2025);
      expect(strategy.getDisplayValue(baseItem, 'description')).toBe('Desc');
    });

    it('should return undefined if the key does not exist', () => {
      // @ts-expect-error - test the runtime behavior
      expect(strategy.getDisplayValue(baseItem, 'nonexistent')).toBeUndefined();
    });

    it('should return null for a key with multicolons', () => {
      // @ts-expect-error - test the runtime behavior
      expect(strategy.getDisplayValue(baseItem, 'a.b.c')).toBeNull();
    });

    it('should return falsy values correctly', () => {
      const item: IFanEditionsProps = {
        id: '2',
        cover: '',
        title: 'T',
        year: 0,
        isMumakil: false,
      };
      expect(strategy.getDisplayValue(item, 'cover')).toBe('');
      expect(strategy.getDisplayValue(item, 'year')).toBe(0);
      expect(strategy.getDisplayValue(item, 'description')).toBeUndefined();
    });
  });
});

describe('FanEditionTableStrategy - Performance', () => {
  it('should process large amounts of data quickly', () => {
    const strategy = new FanEditionTableStrategy();
    const items: IFanEditionsProps[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      cover: `cover${i}.jpg`,
      title: `Title ${i}`,
      year: 2020 + (i % 5),
      description: `Description ${i}`,
      isMumakil: i % 2 === 0,
    }));

    const start = performance.now();

    items.forEach((item) => {
      const headers = strategy.getHeaders(item);
      headers.forEach((header) => {
        strategy.getDisplayValue(item, header.key);
      });
    });

    const end = performance.now();

    expect(end - start).toBeLessThan(100);
  });
});
