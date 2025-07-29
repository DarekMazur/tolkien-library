import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useApi } from '@/hooks/useApi';
import type { ITranslatorProps, IBookProps, TResponse, IPublisherProps } from '@/lib/types';
import { usePublisherData } from '@/hooks/usePublisherData.ts';

vi.mock('@/hooks/useApi');
const mockedUseApi = vi.mocked(useApi);

const fakePublisher: IPublisherProps = {
  title: 'Rebis',
  id: 'rebis',
  description: 'Publisher description',
};

const fakeTranslator: ITranslatorProps = {
  id: 'mariaskibniewska',
  firstName: 'Maria',
  lastName: 'Skibniewska',
  description: '',
};

const fakeBooks: IBookProps[] = [
  {
    id: '1',
    originalTitle: 'The Hobbit',
    polishTitle: 'Hobbit, czyli tam i z powrotem',
    author: 'J.R.R. Tolkien',
    translator: fakeTranslator,
    publisher: fakePublisher,
    year: 2020,
    publicationNumber: 5,
    cover: 'Miękka',
    series: 'Middle-earth',
    isbn: '9781234567897',
  },
  {
    id: '2',
    originalTitle: 'The Lord of the Rings',
    polishTitle: 'Władca Pierścieni',
    author: 'J.R.R. Tolkien',
    translator: fakeTranslator,
    publisher: fakePublisher,
    year: 2019,
    publicationNumber: 3,
    cover: 'Twarda',
    series: 'Middle-earth',
    isbn: '9781234567890',
  },
];

const makeResponse = <T>(
  data: T | null,
  isError = false,
  errorMessage: string | null = null,
  isLoading = false,
): TResponse<T> & { isLoading: boolean } => {
  return { data, isError, errorMessage, isLoading };
};

describe('usePublisherData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('when slug undefined - no fetch, default state', () => {
    mockedUseApi.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });

    const { result } = renderHook(() => usePublisherData());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.entity).toBeNull();
    expect(result.current.books).toBeNull();
    expect(result.current.errorMessage).toBeNull();
  });

  it('loading publisher → loading books → final data', async () => {
    mockedUseApi
      .mockReturnValueOnce({
        ...makeResponse<IPublisherProps>(null),
        isLoading: true,
      })
      .mockReturnValueOnce(makeResponse<IBookProps[]>(null));

    const { result, rerender } = renderHook(({ slug }) => usePublisherData(slug), {
      initialProps: { slug: 'rebis' },
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.entity).toBeNull();

    mockedUseApi.mockReturnValueOnce(makeResponse(fakePublisher)).mockReturnValueOnce({
      ...makeResponse<IBookProps[]>(null),
      isLoading: true,
    });

    rerender({ slug: 'rebis' });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.entity).toEqual(fakePublisher);

    mockedUseApi
      .mockReturnValueOnce(makeResponse(fakePublisher))
      .mockReturnValueOnce(makeResponse(fakeBooks));

    rerender({ slug: 'rebis' });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.entity).toEqual(fakePublisher);
    expect(result.current.books).toEqual(fakeBooks);
    expect(result.current.hasError).toBe(false);
    expect(result.current.errorMessage).toBeNull();
  });

  it('publisher download error → hasError', () => {
    mockedUseApi
      .mockReturnValueOnce(makeResponse<IPublisherProps>(null, true, 'API error'))
      .mockReturnValueOnce(makeResponse<IBookProps[]>(null));

    const { result } = renderHook(() => usePublisherData('rebis'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
    expect(result.current.errorMessage).toBe('An error occurred while downloading data.');
    expect(result.current.entity).toBeNull();
    expect(result.current.books).toBeNull();
  });

  it('book download error after publisher → hasError', () => {
    mockedUseApi
      .mockReturnValueOnce(makeResponse(fakePublisher))
      .mockReturnValueOnce(makeResponse<IBookProps[]>(null, true, 'API error'));

    const { result } = renderHook(() => usePublisherData('rebis'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.entity).toEqual(fakePublisher);
    expect(result.current.hasError).toBe(true);
    expect(result.current.errorMessage).toBe('An error occurred while downloading data.');
    expect(result.current.books).toBeNull();
  });
});
