import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMe } from '../useMe';
import type { IUser } from '@/lib/types';
import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

describe('useMe hook', () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const authUser = {
    email: 'test@example.com',
    nickname: 'testuser',
    picture: 'pic.png',
  };

  function fullAuth0Mock<TUser extends User>(): Auth0ContextInterface<TUser> {
    return {
      isAuthenticated: false,
      isLoading: false,
      user: undefined,
      error: undefined,
      getAccessTokenSilently: vi.fn(),
      getAccessTokenWithPopup: vi.fn(),
      getIdTokenClaims: vi.fn(),
      loginWithRedirect: vi.fn(),
      loginWithPopup: vi.fn(),
      logout: vi.fn(),
      handleRedirectCallback: vi.fn(() => Promise.resolve({})),
    };
  }

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns the initial state according to Auth0', () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...fullAuth0Mock<IUser>(),
      isAuthenticated: false,
      isLoading: true,
      user: undefined,
    });

    const { result } = renderHook(() => useMe());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  it('does not call fetch when the user is not authenticated', async () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...fullAuth0Mock<IUser>(),
      isAuthenticated: false,
      isLoading: false,
      user: {
        email: 'a@b.com',
        userName: 'u',
        emailVerified: true,
        avatar: 'img.png',
      },
    });
    const fetchSpy = vi.spyOn(global, 'fetch');

    const { result } = renderHook(() => useMe());
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches and sets user data when authenticated', async () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...fullAuth0Mock<IUser>(),
      isAuthenticated: true,
      isLoading: false,
      user: authUser,
    });

    const apiResponseUser: IUser = {
      id: 'u1',
      avatar: 'pic.png',
      userName: 'testuser',
      email: 'test@example.com',
      emailVerified: true,
      isBanned: false,
      role: {
        id: '2',
        roleName: 'User',
        roleShorthand: 'user',
      },
    };

    const body = JSON.stringify({ data: apiResponseUser });
    global.fetch = vi.fn().mockResolvedValue(new Response(body, { status: 200 }));

    const { result } = renderHook(() => useMe());
    await waitFor(() => expect(result.current.user).toEqual(apiResponseUser));

    expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/users/me`, {
      method: 'POST',
      body: JSON.stringify({
        email: authUser.email,
        userName: authUser.nickname,
        emailVerified: true,
        avatar: authUser.picture,
      }),
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('leaves user=null when status fetcha ≠ 200', async () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...fullAuth0Mock<IUser>(),
      isAuthenticated: true,
      isLoading: false,
      user: authUser,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 500, statusText: 'Error' }));

    const { result } = renderHook(() => useMe());
    await waitFor(() => expect(result.current.user).toBeNull());
  });

  it('leaves user=null at network failure', async () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...fullAuth0Mock<IUser>(),
      isAuthenticated: true,
      isLoading: false,
      user: authUser,
    });

    global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

    const { result } = renderHook(() => useMe());
    await waitFor(() => expect(result.current.user).toBeNull());
  });
});
