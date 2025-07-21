import { useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { getBooksByTranslator, getTranslatorBySlug } from '@/lib/getDataFromApi';
import { IBookProps, ITranslatorProps } from '@/lib/types';

interface UseTranslatorDataResult {
  translator: ITranslatorProps | null;
  books: IBookProps[] | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

export const useTranslatorData = (slug?: string): UseTranslatorDataResult => {
  const {
    data: translator,
    isError: translatorError,
    isLoading: translatorLoading,
  } = useApi(() => getTranslatorBySlug(slug!), {
    enabled: !!slug,
  });

  const {
    data: books,
    isError: booksError,
    isLoading: booksLoading,
  } = useApi(() => getBooksByTranslator(translator!.id), {
    enabled: !!translator?.id,
  });

  return useMemo(() => {
    const isLoading = translatorLoading || booksLoading;
    const hasError = translatorError || booksError;
    const errorMessage = hasError ? 'Failed to load translator data' : null;

    return {
      translator: translator || null,
      books: books || null,
      isLoading,
      hasError,
      errorMessage,
    };
  }, [translator, books, translatorLoading, booksLoading, translatorError, booksError]);
};
