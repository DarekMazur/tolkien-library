import { vi, Mock } from 'vitest';
import { useLocation, useParams } from 'react-router';
import { ETableType } from '@/lib/types';
import { useLibraryParams } from '../useLibraryParams';
import { renderHook } from '@testing-library/react';

vi.mock('react-router', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
}));

describe('useLibraryParams', () => {
  const mockUseParams = useParams as unknown as Mock;
  const mockUseLocation = useLocation as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct values for the correct type and slug and search', () => {
    mockUseParams.mockReturnValue({ type: 'books', slug: 'fantasy-novel' });
    mockUseLocation.mockReturnValue({ search: '?query=tolkien' });

    const { result } = renderHook(() => useLibraryParams());

    expect(result.current.type).toBe(ETableType.BOOK);
    expect(result.current.slug).toBe('fantasy-novel');
    expect(result.current.search).toBe('query=tolkien');
    expect(result.current.isValid).toBe(true);
  });

  it('should return null for slug when slug is not present', () => {
    mockUseParams.mockReturnValue({ type: 'books' });
    mockUseLocation.mockReturnValue({ search: '' });

    const { result } = renderHook(() => useLibraryParams());

    expect(result.current.type).toBe(ETableType.BOOK);
    expect(result.current.slug).toBeNull();
    expect(result.current.search).toBeNull();
    expect(result.current.isValid).toBe(true);
  });

  it('should return null and isValid=false for unknown type', () => {
    mockUseParams.mockReturnValue({ type: 'invalidType', slug: 'xyz' });
    mockUseLocation.mockReturnValue({ search: '?a=b' });

    const { result } = renderHook(() => useLibraryParams());

    expect(result.current.type).toBeNull();
    expect(result.current.slug).toBe('xyz');
    expect(result.current.search).toBe('a=b');
    expect(result.current.isValid).toBe(false);
  });

  it('should return null for type and slug when type undefined', () => {
    mockUseParams.mockReturnValue({} as never);
    mockUseLocation.mockReturnValue({ search: '' });

    const { result } = renderHook(() => useLibraryParams());

    expect(result.current.type).toBeNull();
    expect(result.current.slug).toBeNull();
    expect(result.current.search).toBeNull();
    expect(result.current.isValid).toBe(false);
  });
});
