import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTranslatorData } from '../useTranslatorData';
import { useApi } from '@/hooks/useApi';
import type { ITranslatorProps, IBookProps, TResponse } from '@/lib/types';

vi.mock('@/hooks/useApi');
const mockedUseApi = vi.mocked(useApi);

const fakeTranslator: ITranslatorProps = {
  firstName: 'Marek',
  lastName: 'Oramus',
  id: 'marekormus',
  description: '',
};
const fakeBooks: IBookProps[] = [
  {
    id: '1',
    originalTitle: 'The Hobbit',
    polishTitle: 'Hobbit, czyli tam i z powrotem',
    author: 'J.R.R. Tolkien',
    translator: fakeTranslator,
    publisher: { title: 'Rebis', id: 'rebis', description: '' },
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
    publisher: { title: 'Rebis', id: 'rebis', description: '' },
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

describe('useTranslatorData', () => {
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

    const { result } = renderHook(() => useTranslatorData());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.translator).toBeNull();
    expect(result.current.books).toBeNull();
    expect(result.current.errorMessage).toBeNull();
  });

  it('loading translator → loading books → final data', async () => {
    mockedUseApi
      .mockReturnValueOnce({
        ...makeResponse<ITranslatorProps>(null),
        isLoading: true,
      })
      .mockReturnValueOnce(makeResponse<IBookProps[]>(null));

    const { result, rerender } = renderHook(({ slug }) => useTranslatorData(slug), {
      initialProps: { slug: 'marek-oramus' },
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.translator).toBeNull();

    mockedUseApi.mockReturnValueOnce(makeResponse(fakeTranslator)).mockReturnValueOnce({
      ...makeResponse<IBookProps[]>(null),
      isLoading: true,
    });

    rerender({ slug: 'marek-oramus' });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.translator).toEqual(fakeTranslator);

    mockedUseApi
      .mockReturnValueOnce(makeResponse(fakeTranslator))
      .mockReturnValueOnce(makeResponse(fakeBooks));

    rerender({ slug: 'marek-oramus' });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.translator).toEqual(fakeTranslator);
    expect(result.current.books).toEqual(fakeBooks);
    expect(result.current.hasError).toBe(false);
    expect(result.current.errorMessage).toBeNull();
  });

  it('translator download error → hasError', () => {
    mockedUseApi
      .mockReturnValueOnce(makeResponse<ITranslatorProps>(null, true, 'API error'))
      .mockReturnValueOnce(makeResponse<IBookProps[]>(null));

    const { result } = renderHook(() => useTranslatorData('marek-oramus'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
    expect(result.current.errorMessage).toBe('Failed to load translator data');
    expect(result.current.translator).toBeNull();
    expect(result.current.books).toBeNull();
  });

  it('book download error after translator → hasError', () => {
    mockedUseApi
      .mockReturnValueOnce(makeResponse(fakeTranslator))
      .mockReturnValueOnce(makeResponse<IBookProps[]>(null, true, 'API error'));

    const { result } = renderHook(() => useTranslatorData('marek-oramus'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.translator).toEqual(fakeTranslator);
    expect(result.current.hasError).toBe(true);
    expect(result.current.errorMessage).toBe('Failed to load translator data');
    expect(result.current.books).toBeNull();
  });
});
