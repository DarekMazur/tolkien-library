import { describe, it, expect } from 'vitest';
import { ArticleTableStrategy } from '../ArticleTableStrategy';
import type { IPublicationProps } from '@/lib/types';

const strategy = new ArticleTableStrategy();

const fullItem: IPublicationProps = {
  id: '1',
  title: 'Test Title',
  author: 'Jan Kowalski',
  publisher: {
    title: 'Wydawnictwo X',
    description: '',
    id: 'wx',
  },
  year: '2025',
  isbn: '123-456',
  issn: '789-012',
  description: 'Test description',
};

describe('ArticleTableStrategy.getAliases', () => {
  it('should return a valid alias object', () => {
    const aliases = strategy.getAliases();
    expect(aliases).toEqual({ publisher: 'publisher.title' });
  });
});

describe('ArticleTableStrategy.getHeaders', () => {
  it('returns all headers in the specified order when isbn and issn are present', () => {
    const headers = strategy.getHeaders(fullItem);
    const displayTitles = headers.map((h) => h.displayTitle);
    expect(displayTitles).toEqual(['Tytuł', 'Autor', 'Wydawca', 'Rok', 'ISBN', 'ISSN', 'Opis']);
    expect(headers.find((h) => h.displayTitle === 'ISBN')?.sortable).toBe(true);
    expect(headers.find((h) => h.displayTitle === 'Opis')?.sortable).toBe(false);
  });

  it('omits the ISBN header when item.isbn is null', () => {
    const item = { ...fullItem, isbn: null };
    const headers = strategy.getHeaders(item);
    expect(headers.map((h) => h.displayTitle)).not.toContain('ISBN');
    expect(headers.map((h) => h.displayTitle)).toContain('ISSN');
  });

  it('omits the ISSN header when item.issn is null', () => {
    const item = { ...fullItem, issn: null };
    const headers = strategy.getHeaders(item);
    expect(headers.map((h) => h.displayTitle)).not.toContain('ISSN');
    expect(headers.map((h) => h.displayTitle)).toContain('ISBN');
  });
});

describe('ArticleTableStrategy.getDisplayValue - flat keys', () => {
  it('returns the value of title', () => {
    expect(strategy.getDisplayValue(fullItem, 'title')).toBe('Test Title');
  });

  it('returns the value of year', () => {
    expect(strategy.getDisplayValue(fullItem, 'year')).toBe('2025');
  });
});

describe('ArticleTableStrategy.getDisplayValue - objects as keys', () => {
  it('returns the value of publisher.title', () => {
    expect(strategy.getDisplayValue(fullItem, 'publisher.title')).toBe('Wydawnictwo X');
  });

  it('returns null when parent is null or non-object', () => {
    const itemNullParent = { ...fullItem, publisher: null as never };
    expect(strategy.getDisplayValue(itemNullParent, 'publisher.title')).toBeNull();
  });

  it('returns null when childKey does not exist', () => {
    expect(strategy.getDisplayValue(fullItem, 'publisher.nonexistent' as never)).toBeNull();
  });
});
