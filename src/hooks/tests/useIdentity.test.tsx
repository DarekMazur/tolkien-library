import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useIdentity } from '../useIdentity';
import type { IIdentityProps } from '@/lib/types';

describe('useIdentity hook', () => {
  const fakeIdentity: IIdentityProps = {
    id: 'abc-123',
    adminContact: {
      name: 'Admin Name',
      value: 'admin@example.com',
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns identity=null before the fetch is completed', () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {})) as typeof fetch;

    const { result } = renderHook(() => useIdentity());
    expect(result.current.identity).toBeNull();
  });

  it('sets identity after successful fetch (true Response)', async () => {
    const body = JSON.stringify({ data: fakeIdentity });
    const okResponse = new Response(body, { status: 200, statusText: 'OK' });
    global.fetch = vi.fn().mockResolvedValue(okResponse);

    const { result } = renderHook(() => useIdentity());
    await waitFor(() => expect(result.current.identity).toEqual(fakeIdentity));
  });

  it('with res.ok=false identity remains null (cast by unknown)', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false } as unknown as Response);

    const { result } = renderHook(() => useIdentity());
    await waitFor(() => expect(result.current.identity).toBeNull());
  });

  it('with network error identity remains null', async () => {
    const networkError = new Error('Network failure');
    global.fetch = vi.fn().mockRejectedValue(networkError);

    const { result } = renderHook(() => useIdentity());
    await waitFor(() => expect(result.current.identity).toBeNull());
  });
});
