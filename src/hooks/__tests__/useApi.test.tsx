import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useApi } from '../useApi';
import type { TResponse } from '@/lib/types';

describe('useApi hook', () => {
  it('should return the data after a successful call to fn', async () => {
    const mockFn = vi.fn<() => Promise<TResponse<string>>>(() =>
      Promise.resolve({ data: 'hello', isError: false, errorMessage: null }),
    );

    const { result } = renderHook(() => useApi(mockFn));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBe('hello');
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBeNull();
  });

  it('should set isError and errorMessage when fn returns an error', async () => {
    const mockFn = vi.fn<() => Promise<TResponse<string>>>(() =>
      Promise.resolve({ data: null, isError: true, errorMessage: 'Server error' }),
    );

    const { result } = renderHook(() => useApi(mockFn));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Server error');
  });

  it('should handle the thrown exception', async () => {
    const mockFn = vi.fn<() => Promise<TResponse<null>>>(() =>
      Promise.reject(new Error('Network failure')),
    );

    const { result } = renderHook(() => useApi(mockFn));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Error: Network failure');
  });
});
