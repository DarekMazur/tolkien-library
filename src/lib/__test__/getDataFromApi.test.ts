import { vi } from 'vitest';
import { fetchApi, getPageBySlug, getCategoryBySlug, getPageIdentity } from '../getDataFromApi.ts';
import type { TResponse } from '@/lib/types';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchApi', () => {
  it('returns data at status 200', async () => {
    const mockJson = { foo: 'bar' };
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockJson),
    });

    const result = await fetchApi<typeof mockJson>('/test-url');

    expect(result).toEqual<TResponse<typeof mockJson>>({
      data: mockJson,
      isError: false,
      errorMessage: null,
    });
  });

  it('sets isError and errorMessage at HTTP error', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await fetchApi<null>('/not-found');

    expect(result).toEqual<TResponse<null>>({
      data: null,
      isError: true,
      errorMessage: 'HTTP 404: Not Found',
    });
  });

  it('handles the network exception', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network failure'));

    const result = await fetchApi<null>('/error');

    expect(result).toEqual<TResponse<null>>({
      data: null,
      isError: true,
      errorMessage: 'Network failure',
    });
  });
});

describe('getPageBySlug', () => {
  it('delegates to fetchApi with a valid URL and returns the result', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    const mockResponse = { page: 'content' };
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getPageBySlug('home');

    expect(result).toEqual({
      data: mockResponse,
      isError: false,
      errorMessage: null,
    });
  });
});

describe('getCategoryBySlug', () => {
  it('returns a category object when slug exists', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    const categories = [
      { id: 1, slug: 'foo', name: 'Foo' },
      { id: 2, slug: 'bar', name: 'Bar' },
    ];
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(categories),
    });

    const result = await getCategoryBySlug('bar');

    expect(result).toEqual({
      data: { id: 2, slug: 'bar', name: 'Bar' },
      isError: false,
      errorMessage: null,
    });
  });

  it('returns data=null when slug does not exist', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    const categories = [{ id: 1, slug: 'foo', name: 'Foo' }];
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(categories),
    });

    const result = await getCategoryBySlug('bar');

    expect(result).toEqual({
      data: null,
      isError: false,
      errorMessage: null,
    });
  });

  it('propagates an error from fetchApi', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    });

    const result = await getCategoryBySlug('foo');

    expect(result).toEqual({
      data: null,
      isError: true,
      errorMessage: 'HTTP 500: Server Error',
    });
  });
});

describe('getPageIdentity', () => {
  it('returns identity data at status 200', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    const identity = { user: 'admin' };
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(identity),
    });

    const result = await getPageIdentity();

    expect(result).toEqual({
      data: identity,
      isError: false,
      errorMessage: null,
    });
  });

  it('sets isError on HTTP error', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    const result = await getPageIdentity();

    expect(result).toEqual({
      data: null,
      isError: true,
      errorMessage: 'HTTP 401: Unauthorized',
    });
  });
});
