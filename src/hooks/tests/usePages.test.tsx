import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePages } from '../usePages';
import type { IPageProps } from '@/lib/types';

const fakePage: IPageProps = {
  id: '1',
  title: 'Test Page',
  content: '<p>Hello</p>',
};

describe('hook usePages', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns isLoading=true and page=null at the beginning', () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {})) as typeof fetch;

    const { result } = renderHook(() => usePages('slug'));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.page).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBe('');
  });

  it('sets page and isLoading=false after successful fetch', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakePage),
    });

    const { result } = renderHook(() => usePages('slug'));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.page).toEqual(fakePage);
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBe('');
  });

  it('sets isError=true and isLoading=false when res.ok=false', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    const { result } = renderHook(() => usePages('slug'));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.page).toBeNull();
    expect(result.current.errorMessage).toBe('');
  });

  it('on network error sets isError=true and leaves errorMessage', async () => {
    const networkError = new Error('Network failure');
    global.fetch = vi.fn().mockRejectedValue(networkError);

    const { result } = renderHook(() => usePages('slug'));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('');
  });
});
