import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEntityWithBooks } from '../useEntityWithBooks';
import { useApi } from '@/hooks/useApi';
import type {
  TResponse,
  IBookProps,
  IPublisherProps,
  ICategoryProps,
  IPageProps,
} from '@/lib/types';

vi.mock('@/hooks/useApi', () => ({
  useApi: vi.fn(),
}));

const mockUseApi = vi.mocked(useApi);

const mockFetchPublisher = vi.fn<(slug: string) => Promise<TResponse<IPublisherProps>>>();
const mockFetchCategory = vi.fn<(slug: string) => Promise<TResponse<ICategoryProps>>>();
const mockFetchBooks = vi.fn<(id: string) => Promise<TResponse<IBookProps[]>>>();
const mockFetchPages = vi.fn<(id: string) => Promise<TResponse<IPageProps[]>>>();

const mockPublisher: IPublisherProps = {
  id: 'publisher-1',
  title: 'Test Publisher',
  description: 'Test description',
};

const mockCategory: ICategoryProps = {
  id: 'category-1',
  title: 'Test Category',
  slug: 'test-category',
};

const mockBooks: IBookProps[] = [
  {
    id: 'book-1',
    originalTitle: 'Test Book 1',
    polishTitle: 'Testowa Książka 1',
    author: 'Any Author',
    translator: null,
    publisher: mockPublisher,
    year: 2023,
    publicationNumber: 1,
    cover: null,
    series: null,
    isbn: '978-83-123-4567-8',
  },
  {
    id: 'book-2',
    originalTitle: 'Test Book 2',
    polishTitle: 'Testowa Książka 2',
    author: null,
    translator: null,
    publisher: mockPublisher,
    year: 2024,
    publicationNumber: 2,
    cover: null,
    series: null,
    isbn: '978-83-123-4567-9',
  },
];

const mockPages: IPageProps[] = [
  {
    id: 'page-1',
    title: 'Test Page',
    slug: 'test-page',
    content: 'Test content',
    category: mockCategory,
  },
];

describe('useEntityWithBooks - Core Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('successful data flow', () => {
    it('should return entity and books when both API calls succeed', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: mockPublisher,
          isError: false,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: mockBooks,
          isError: false,
          isLoading: false,
          errorMessage: null,
        });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.entity).toEqual(mockPublisher);
      expect(result.current.books).toEqual(mockBooks);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(false);
      expect(result.current.errorMessage).toBeNull();
    });

    it('should return empty books array when no books found', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: mockPublisher,
          isError: false,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: [],
          isError: false,
          isLoading: false,
          errorMessage: null,
        });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.entity).toEqual(mockPublisher);
      expect(result.current.books).toEqual([]);
      expect(result.current.hasError).toBe(false);
    });
  });

  describe('loading states', () => {
    it('should show loading when entity is being fetched', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: null,
          isError: false,
          isLoading: true,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: null,
          isError: false,
          isLoading: false,
          errorMessage: null,
        });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entity).toBeNull();
      expect(result.current.books).toBeNull();
    });

    it('should show loading when books are being fetched', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: mockPublisher,
          isError: false,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: null,
          isError: false,
          isLoading: true,
          errorMessage: null,
        });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entity).toEqual(mockPublisher);
      expect(result.current.books).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should handle entity fetch error', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: null,
          isError: true,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: null,
          isError: false,
          isLoading: false,
          errorMessage: null,
        });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.hasError).toBe(true);
      expect(result.current.errorMessage).toBe('An error occurred while downloading data.');
      expect(result.current.entity).toBeNull();
      expect(result.current.books).toBeNull();
    });

    it('should handle books fetch error', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: mockPublisher,
          isError: false,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: null,
          isError: true,
          isLoading: false,
          errorMessage: null,
        });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.hasError).toBe(true);
      expect(result.current.errorMessage).toBe('An error occurred while downloading data.');
      expect(result.current.entity).toEqual(mockPublisher);
      expect(result.current.books).toBeNull();
    });
  });

  describe('slug parameter validation', () => {
    it('should not fetch entity when slug is undefined', () => {
      mockUseApi.mockReturnValue({
        data: null,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: undefined,
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.entity).toBeNull();
      expect(result.current.books).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(false);

      expect(mockUseApi).toHaveBeenNthCalledWith(1, expect.any(Function), { enabled: false });
    });

    it('should not fetch entity when slug is empty string', () => {
      mockUseApi.mockReturnValue({
        data: null,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });

      const { result } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: '',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(result.current.entity).toBeNull();
      expect(result.current.books).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(false);
    });
  });

  describe('sequential loading logic', () => {
    it('should not enable books fetch when entity is not available', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: null,
          isError: false,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: null,
          isError: false,
          isLoading: false,
          errorMessage: null,
        });

      renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(mockUseApi).toHaveBeenNthCalledWith(2, expect.any(Function), { enabled: false });
    });

    it('should enable books fetch when entity is available', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: mockPublisher,
          isError: false,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: mockBooks,
          isError: false,
          isLoading: false,
          errorMessage: null,
        });

      renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      expect(mockUseApi).toHaveBeenNthCalledWith(2, expect.any(Function), { enabled: true });
    });

    it('should call fetchBooks with entity.id when entity is loaded', () => {
      mockUseApi
        .mockReturnValueOnce({
          data: mockPublisher,
          isError: false,
          isLoading: false,
          errorMessage: null,
        })
        .mockReturnValueOnce({
          data: mockBooks,
          isError: false,
          isLoading: false,
          errorMessage: null,
        });

      renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      const booksFetchFunction = mockUseApi.mock.calls[1][0];
      booksFetchFunction();
      expect(mockFetchBooks).toHaveBeenCalledWith(mockPublisher.id);
    });
  });

  describe('memoization', () => {
    it('should return stable reference when dependencies have not changed', () => {
      mockUseApi.mockReturnValue({
        data: mockPublisher,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });

      const { result, rerender } = renderHook(() =>
        useEntityWithBooks<IPublisherProps, IBookProps>({
          slug: 'test-slug',
          fetchEntity: mockFetchPublisher,
          fetchBooks: mockFetchBooks,
        }),
      );

      const firstResult = result.current;
      rerender();
      const secondResult = result.current;

      expect(firstResult).toBe(secondResult);
    });
  });
});

describe('useEntityWithBooks - Generic Type Support', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should work with different entity types', () => {
    mockUseApi
      .mockReturnValueOnce({
        data: mockCategory,
        isError: false,
        isLoading: false,
        errorMessage: null,
      })
      .mockReturnValueOnce({
        data: mockPages,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });

    const { result } = renderHook(() =>
      useEntityWithBooks<ICategoryProps, IPageProps>({
        slug: 'test-category',
        fetchEntity: mockFetchCategory,
        fetchBooks: mockFetchPages,
      }),
    );

    expect(result.current.entity).toEqual(mockCategory);
    expect(result.current.books).toEqual(mockPages);
    expect(result.current.hasError).toBe(false);
  });
});
