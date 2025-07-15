import { vi, Mock } from 'vitest';
import { useGenericHeaders } from '../useGenericHeaders';
import { ETableType, IBookProps } from '@/lib/types';
import { TableStrategyFactory } from '@/lib/factories/TableStrategyFactory';
import { renderHook } from '@testing-library/react';

const mockGetHeaders = vi.fn();
const mockGetDisplayValue = vi.fn();
const mockGetAliases = vi.fn();

const mockStrategy = {
  getHeaders: mockGetHeaders,
  getDisplayValue: mockGetDisplayValue,
  getAliases: mockGetAliases,
};

vi.mock('@/lib/factories/TableStrategyFactory', () => ({
  TableStrategyFactory: {
    createStrategy: vi.fn(),
  },
}));

describe('useGenericHeaders', () => {
  const sampleBook: IBookProps = {
    id: '1',
    originalTitle: 'The Hobbit',
    polishTitle: 'Hobbit, czyli tam i z powrotem',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Maria',
      lastName: 'Skibniewska',
      description: '',
      id: 'ms',
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

  const items = [sampleBook];

  beforeEach(() => {
    vi.clearAllMocks();
    (TableStrategyFactory.createStrategy as Mock).mockReturnValue(mockStrategy);
  });

  it('should return empty headers when items vi empty', () => {
    const { result, rerender } = renderHook(({ items, type }) => useGenericHeaders(items, type), {
      initialProps: { items: [], type: ETableType.BOOK },
    });

    expect(result.current.headers).toEqual([]);
    expect(TableStrategyFactory.createStrategy).toHaveBeenCalledWith(ETableType.BOOK);

    rerender({ items: [], type: ETableType.ARTICLE });
    expect(result.current.headers).toEqual([]);
    expect(TableStrategyFactory.createStrategy).toHaveBeenCalledWith(ETableType.ARTICLE);
  });

  it('should return headers from the strategy when items not vi empty', () => {
    mockGetHeaders.mockReturnValue(['col1', 'col2']);

    const { result } = renderHook(() => useGenericHeaders(items, ETableType.BOOK));

    expect(TableStrategyFactory.createStrategy).toHaveBeenCalledWith(ETableType.BOOK);
    expect(mockGetHeaders).toHaveBeenCalledWith(sampleBook);
    expect(result.current.headers).toEqual(['col1', 'col2']);
  });

  it('getDisplayValue should return the result of the strategy method', () => {
    const key = 'year';
    mockGetDisplayValue.mockReturnValue('Value for name');

    const { result } = renderHook(() => useGenericHeaders(items, ETableType.BOOK));

    const display = result.current.getDisplayValue(sampleBook, key);
    expect(mockGetDisplayValue).toHaveBeenCalledWith(sampleBook, key);
    expect(display).toBe('Value for name');
  });

  it('aliases should return aliases from the strategy', () => {
    mockGetAliases.mockReturnValue({ translator: 'Maria Skibniewska' });

    const { result } = renderHook(() => useGenericHeaders(items, ETableType.BOOK));

    expect(mockGetAliases).toHaveBeenCalled();
    expect(result.current.aliases).toEqual({ translator: 'Maria Skibniewska' });
  });

  it('should update the strategy when the publicationType changes', () => {
    const strategyBook = {
      getHeaders: vi.fn().mockReturnValue(['first']),
      getDisplayValue: vi.fn(),
      getAliases: vi.fn(),
    };
    const strategyArticle = {
      getHeaders: vi.fn().mockReturnValue(['second']),
      getDisplayValue: vi.fn(),
      getAliases: vi.fn(),
    };

    (TableStrategyFactory.createStrategy as Mock)
      .mockReturnValueOnce(strategyBook)
      .mockReturnValueOnce(strategyArticle);

    const { result, rerender } = renderHook(({ items, type }) => useGenericHeaders(items, type), {
      initialProps: { items, type: ETableType.BOOK },
    });

    expect(TableStrategyFactory.createStrategy).toHaveBeenCalledWith(ETableType.BOOK);
    expect(result.current.headers).toEqual(['first']);

    rerender({ items, type: ETableType.ARTICLE });

    expect(TableStrategyFactory.createStrategy).toHaveBeenCalledWith(ETableType.ARTICLE);
    expect(result.current.headers).toEqual(['second']);
  });
});
