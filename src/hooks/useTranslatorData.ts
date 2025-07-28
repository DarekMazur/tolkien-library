import { getBooksByTranslator, getTranslatorBySlug } from '@/lib/getDataFromApi';
import { IBookProps, ITranslatorProps } from '@/lib/types';
import { useEntityWithBooks } from '@/hooks/useEntityWithBooks.ts';

export const useTranslatorData = (slug?: string) =>
  useEntityWithBooks<ITranslatorProps, IBookProps>({
    slug,
    fetchEntity: getTranslatorBySlug,
    fetchBooks: getBooksByTranslator,
  });
