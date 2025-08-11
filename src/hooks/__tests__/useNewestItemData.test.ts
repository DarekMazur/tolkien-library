import { vi } from 'vitest';
import { useNewestItemData } from '@/hooks/useNewestItemData';
import * as useMeModule from '@/hooks/useMe';
import * as formatDateModule from '@/lib/helpers/formatDate';
import * as getLatestModule from '@/lib/helpers/getLatest';
import * as typeGuards from '@/lib/helpers/publicationsTypeGuard';
import * as createSlugModule from '@/lib/helpers/createSlug';
import {
  IUser,
  TPublications,
  IBookProps,
  ITranslatorProps,
  IPublisherProps,
  IFanzinProps,
} from '@/lib/types';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';

describe('useNewestItemData', () => {
  const mockUser: IUser = {
    id: 'u1',
    userName: 'jan',
    createdAt: new Date('2020-01-01T00:00:00.000Z'),
    isBanned: false,
    role: {
      roleName: 'User',
      roleShorthand: 'user',
      id: '3',
      createdAt: faker.date.past(),
    },
    avatar: '',
    email: '',
    emailVerified: false,
  };

  const mockPublisher: IPublisherProps = {
    id: 'p1',
    title: 'Wydawnictwo X',
    description: 'Desc',
    createdAt: faker.date.past(),
  };

  const mockTranslator: ITranslatorProps = {
    id: 't1',
    firstName: 'Anna',
    lastName: 'K.',
    description: 'Desc',
    createdAt: faker.date.past(),
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(useMeModule, 'useMe').mockReturnValue({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
    });
    vi.spyOn(formatDateModule, 'formatDate').mockImplementation(
      (date: Date) => `fmt(${date.toISOString()})`,
    );
    vi.spyOn(createSlugModule, 'createSlug').mockImplementation((title) => `slug-${title}`);
  });

  it('type="user" without content → No users', () => {
    const { result } = renderHook(() => useNewestItemData('user'));
    expect(result.current.itemData).toEqual({ displayText: 'No users', link: null });
    expect(result.current.isLoading).toBe(false);
  });

  it('type="user" with current user content → you', () => {
    const content: IUser = { ...mockUser };
    const { result } = renderHook(() => useNewestItemData('user', content));
    expect(result.current.itemData).toEqual({
      displayText: 'jan (you)',
      link: null,
    });
  });

  it('type="user" from another user\'s content → formatDate', () => {
    const other: IUser = {
      id: 'u2',
      userName: 'ola',
      createdAt: new Date('2021-02-03T04:05:06.000Z'),
      isBanned: false,
      role: {
        roleName: 'User',
        roleShorthand: 'user',
        id: '3',
        createdAt: faker.date.past(),
      },
      avatar: '',
      email: '',
      emailVerified: false,
    };
    const { result } = renderHook(() => useNewestItemData('user', other));
    expect(formatDateModule.formatDate).toHaveBeenCalledWith(other.createdAt);
    expect(result.current.itemData).toEqual({
      displayText: 'ola (fmt(2021-02-03T04:05:06.000Z))',
      link: null,
    });
  });

  it('type="entry” without content → No entries', () => {
    const { result } = renderHook(() => useNewestItemData('entry'));
    expect(result.current.itemData).toEqual({ displayText: 'No entries', link: null });
  });

  it('entry without latest → No entries', () => {
    const fakeFanzin: IFanzinProps & IPublisherProps = {
      id: 'x1',
      title: 'Fanzin',
      publisher: mockPublisher,
      startDate: new Date('2022-02-02'),
      lastIssueDate: null,
      description: '',
      createdAt: faker.date.past(),
    };
    vi.spyOn(getLatestModule, 'getLatest').mockReturnValue(null);
    const { result } = renderHook(() =>
      useNewestItemData('entry', fakeFanzin as unknown as TPublications),
    );
    expect(getLatestModule.getLatest).toHaveBeenCalledWith(fakeFanzin);
    expect(result.current.itemData).toEqual({ displayText: 'No entries', link: null });
  });

  it('book type entry → displayText and link', () => {
    const book: IBookProps & IPublisherProps = {
      id: 'b1',
      originalTitle: 'Orig',
      polishTitle: 'Pol',
      author: 'Auth',
      translator: mockTranslator,
      publisher: mockPublisher,
      year: 2023,
      publicationNumber: 1,
      cover: null,
      series: null,
      isbn: '123',
      title: mockPublisher.title,
      description: '',
      createdAt: new Date('2023-03-03T00:00:00Z'),
    };
    vi.spyOn(getLatestModule, 'getLatest').mockReturnValue('Pol');
    vi.spyOn(typeGuards, 'isBook').mockReturnValue(true);
    vi.spyOn(typeGuards, 'isTranslator').mockReturnValue(false);
    vi.spyOn(typeGuards, 'isPublisher').mockReturnValue(false);

    const { result } = renderHook(() =>
      useNewestItemData('entry', book as unknown as TPublications),
    );
    expect(result.current.itemData).toEqual({
      displayText: 'Pol (fmt(2023-03-03T00:00:00.000Z))',
      link: '/library/books/slug-Pol',
    });
  });

  it('translator entry → translator link', () => {
    const payload = {
      ...mockTranslator,
      createdAt: new Date('2024-04-04T00:00:00Z'),
    };
    vi.spyOn(getLatestModule, 'getLatest').mockReturnValue('Anna K.');
    vi.spyOn(typeGuards, 'isBook').mockReturnValue(false);
    vi.spyOn(typeGuards, 'isTranslator').mockReturnValue(true);
    vi.spyOn(typeGuards, 'isPublisher').mockReturnValue(false);

    const { result } = renderHook(() =>
      useNewestItemData('entry', payload as unknown as TPublications),
    );
    expect(result.current.itemData.link).toBe('/library/translator/slug-Anna K.');
  });

  it('entry type publisher → link publisher', () => {
    const payload = {
      ...mockPublisher,
      createdAt: new Date('2025-05-05T00:00:00Z'),
    };
    vi.spyOn(getLatestModule, 'getLatest').mockReturnValue('Wydawnictwo X');
    vi.spyOn(typeGuards, 'isBook').mockReturnValue(false);
    vi.spyOn(typeGuards, 'isTranslator').mockReturnValue(false);
    vi.spyOn(typeGuards, 'isPublisher').mockReturnValue(true);

    const { result } = renderHook(() =>
      useNewestItemData('entry', payload as unknown as TPublications),
    );
    expect(result.current.itemData.link).toBe('/library/publisher/slug-Wydawnictwo X');
  });

  it('entry of a different type → displayText without a link', () => {
    const createdAt = new Date('2025-06-06T00:00:00Z');
    const fanEd = { createdAt } as unknown as TPublications;

    vi.spyOn(getLatestModule, 'getLatest').mockReturnValue('Fan');
    vi.spyOn(typeGuards, 'isBook').mockReturnValue(false);
    vi.spyOn(typeGuards, 'isTranslator').mockReturnValue(false);
    vi.spyOn(typeGuards, 'isPublisher').mockReturnValue(false);

    const { result } = renderHook(() => useNewestItemData('entry', fanEd));

    expect(result.current.itemData).toEqual({
      displayText: 'Fan (fmt(2025-06-06T00:00:00.000Z))',
      link: null,
    });
  });

  it('passes isLoading from useMe', () => {
    vi.spyOn(useMeModule, 'useMe').mockReturnValue({
      user: null,
      isLoading: true,
      isAuthenticated: false,
    });
    const { result } = renderHook(() => useNewestItemData('user'));
    expect(result.current.isLoading).toBe(true);
  });
});
