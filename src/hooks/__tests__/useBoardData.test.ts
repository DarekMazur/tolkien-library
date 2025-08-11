import { renderHook } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useBoardData } from '../useBoardData';
import type { IUser } from '@/lib/types';

vi.mock('../../../store', () => ({
  useGetUsersQuery: vi.fn(),
  useGetLatestQuery: vi.fn(),
}));
vi.mock('@/hooks/useMe', () => ({
  useMe: vi.fn(),
}));

import { useGetUsersQuery, useGetLatestQuery } from '../../../store';
import { useMe } from '@/hooks/useMe';
import { faker } from '@faker-js/faker';

describe('useBoardData', () => {
  const mockUser: IUser = {
    id: 'u1',
    createdAt: new Date('2025-01-01T00:00:00Z'),
    avatar: 'url',
    email: 'a@b.com',
    emailVerified: true,
    userName: 'user1',
    isBanned: false,
    role: {
      id: 'r1',
      roleName: 'Admin',
      roleShorthand: 'ADM',
      createdAt: faker.date.past(),
    },
  };

  const otherUser: IUser = {
    id: 'u2',
    createdAt: new Date('2025-06-01T00:00:00Z'),
    avatar: 'url2',
    email: 'c@d.com',
    emailVerified: true,
    userName: 'user2',
    isBanned: false,
    role: {
      id: 'r2',
      roleName: 'User',
      roleShorthand: 'USR',
      createdAt: faker.date.past(),
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return the data when everything has loaded correctly', () => {
    (useGetUsersQuery as Mock).mockReturnValue({
      data: [mockUser, otherUser],
      isLoading: false,
      isError: false,
    });
    (useGetLatestQuery as Mock).mockReturnValue({
      data: { entryId: 'e1' },
      isLoading: false,
      isError: false,
    });
    (useMe as Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const { result } = renderHook(() => useBoardData());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.latestUser).toEqual(otherUser);
    expect(result.current.latestEntry).toEqual({ entryId: 'e1' });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  it('should set isLoading to true when any loading is true', () => {
    (useGetUsersQuery as Mock).mockReturnValue({
      data: [mockUser],
      isLoading: true,
      isError: false,
    });
    (useGetLatestQuery as Mock).mockReturnValue({
      data: { entryId: 'e1' },
      isLoading: false,
      isError: false,
    });
    (useMe as Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const { result } = renderHook(() => useBoardData());
    expect(result.current.isLoading).toBe(true);
  });

  it('should return undefined as latestUser when usersData is empty', () => {
    (useGetUsersQuery as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    (useGetLatestQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });
    (useMe as Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const { result } = renderHook(() => useBoardData());
    expect(result.current.latestUser).toBeUndefined();
  });

  it('should set hasError to true when there is an error in usersQuery', () => {
    (useGetUsersQuery as Mock).mockReturnValue({
      data: [mockUser],
      isLoading: false,
      isError: true,
    });
    (useGetLatestQuery as Mock).mockReturnValue({
      data: { entryId: 'e1' },
      isLoading: false,
      isError: false,
    });
    (useMe as Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const { result } = renderHook(() => useBoardData());
    expect(result.current.hasError).toBe(true);
  });

  it('should set hasError to true when there is no user (not logged in)', () => {
    (useGetUsersQuery as Mock).mockReturnValue({
      data: [mockUser],
      isLoading: false,
      isError: false,
    });
    (useGetLatestQuery as Mock).mockReturnValue({
      data: { entryId: 'e1' },
      isLoading: false,
      isError: false,
    });
    (useMe as Mock).mockReturnValue({
      user: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useBoardData());
    expect(result.current.hasError).toBe(true);
  });

  it('should set hasError to true when there is an error in latestQuery', () => {
    (useGetUsersQuery as Mock).mockReturnValue({
      data: [mockUser],
      isLoading: false,
      isError: false,
    });
    (useGetLatestQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    (useMe as Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const { result } = renderHook(() => useBoardData());
    expect(result.current.hasError).toBe(true);
  });
});
