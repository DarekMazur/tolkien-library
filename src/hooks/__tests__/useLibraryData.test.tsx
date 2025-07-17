import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLibraryData } from '../useLibraryData';
import { ETableType } from '@/lib/types';
import * as paramsHook from '../useLibraryParams';
import * as apiHook from '@/hooks/useApi';
import { renderHook } from '@testing-library/react';

describe('useLibraryData', () => {
  const mockUseLibraryParams = vi.spyOn(paramsHook, 'useLibraryParams');
  const mockUseApi = vi.spyOn(apiHook, 'useApi');

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return state “invalid” when isValid=false', () => {
    mockUseLibraryParams.mockReturnValue({ type: null, slug: null, search: null, isValid: false });
    const { result } = renderHook(() => useLibraryData());
    expect(result.current).toEqual({ state: 'invalid' });
  });

  it('should return the state “loading” during book fetch', () => {
    mockUseLibraryParams.mockReturnValue({
      type: ETableType.BOOK,
      slug: null,
      search: 'test',
      isValid: true,
    });
    mockUseApi.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      errorMessage: null,
    });
    const { result } = renderHook(() => useLibraryData());
    expect(result.current).toEqual({ state: 'loading' });
  });

  it('should return state “error” when fetch books return an error', () => {
    mockUseLibraryParams.mockReturnValue({
      type: ETableType.BOOK,
      slug: null,
      search: 'test',
      isValid: true,
    });
    mockUseApi.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      errorMessage: null,
    });
    const { result } = renderHook(() => useLibraryData());
    expect(result.current).toEqual({ state: 'error' });
  });

  it('should return the data of the books in state “books”', () => {
    const books = [{ id: 1, title: 'Hobbit' }];
    mockUseLibraryParams.mockReturnValue({
      type: ETableType.BOOK,
      slug: null,
      search: 'hobbit',
      isValid: true,
    });
    mockUseApi.mockReturnValue({
      data: books,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });
    const { result } = renderHook(() => useLibraryData());
    expect(result.current).toEqual({
      state: 'books',
      data: books,
      type: ETableType.BOOK,
      search: 'hobbit',
    });
  });

  it('should return state “publications” for articles', () => {
    const pubs = [{ id: 1, name: 'Article' }];
    mockUseLibraryParams.mockReturnValue({
      type: ETableType.ARTICLE,
      slug: null,
      search: null,
      isValid: true,
    });
    mockUseApi.mockReturnValue({
      data: pubs,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });
    const { result } = renderHook(() => useLibraryData());
    expect(result.current).toEqual({
      state: 'publications',
      data: pubs,
      type: ETableType.ARTICLE,
    });
  });

  it('should return state “category” for category', () => {
    const category = { id: 'fantasy', name: 'Fantasy' };
    mockUseLibraryParams.mockReturnValue({
      type: 'custom' as unknown as ETableType,
      slug: 'fantasy',
      search: null,
      isValid: true,
    });
    mockUseApi.mockReturnValue({
      data: category,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });
    const { result } = renderHook(() => useLibraryData());
    expect(result.current).toEqual({
      state: 'category',
      data: category,
      type: 'custom',
    });
  });

  it('should return state “empty” when no parameters to fetch', () => {
    mockUseLibraryParams.mockReturnValue({
      type: 'custom' as unknown as ETableType,
      slug: null,
      search: null,
      isValid: true,
    });
    const { result } = renderHook(() => useLibraryData());
    expect(result.current).toEqual({
      state: 'empty',
      type: 'custom',
    });
  });
});
