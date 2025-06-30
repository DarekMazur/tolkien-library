import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCategory } from '../useCategory';
import type { ICategoryProps } from '@/lib/types';

const fakeCategory: ICategoryProps = {
  id: '1',
  title: 'Test Category',
  slug: 'test-category',
};

const fakeCategoriesResponse: ICategoryProps[] = [
  fakeCategory,
  {
    id: '2',
    title: 'Another Category',
    slug: 'another-category',
  },
];

describe('useCategory hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns isLoading=false, category=undefined, isError=false and errorMessage=undefined at the beginning', () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {})) as typeof fetch;

    const { result } = renderHook(() => useCategory('test-category'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.category).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('sets category and keeps isLoading=false after successful fetch', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakeCategoriesResponse),
    });

    const { result } = renderHook(() => useCategory('test-category'));

    await waitFor(() => {
      expect(result.current.category).toEqual(fakeCategory);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('returns undefined when category with given slug is not found', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakeCategoriesResponse),
    });

    const { result } = renderHook(() => useCategory('non-existing-slug'));

    await waitFor(() => {
      expect(result.current.category).toBeUndefined();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('sets isError=true and isLoading=false when res.ok=false', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useCategory('test-category'));

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.category).toBeUndefined();
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('on network error sets isError=true and leaves errorMessage undefined', async () => {
    const networkError = new Error('Network failure');
    global.fetch = vi.fn().mockRejectedValue(networkError);

    const { result } = renderHook(() => useCategory('test-category'));

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.category).toBeUndefined();
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('filters categories correctly and returns first matching category', async () => {
    const multipleCategoriesWithSameSlug = [
      ...fakeCategoriesResponse,
      {
        id: '3',
        title: 'Duplicate Category',
        slug: 'test-category',
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(multipleCategoriesWithSameSlug),
    });

    const { result } = renderHook(() => useCategory('test-category'));

    await waitFor(() => {
      expect(result.current.category).toEqual(fakeCategory);
    });

    expect(result.current.category?.id).toBe('1');
  });

  it('calls fetch with correct URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakeCategoriesResponse),
    });
    global.fetch = mockFetch;

    renderHook(() => useCategory('test-category'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/categories`);
    });
  });
});
