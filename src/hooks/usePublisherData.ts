import { IBookProps, IPublisherProps } from '@/lib/types';
import { getBooksByPublisher, getPublisherBySlug } from '@/lib/getDataFromApi';
import { useEntityWithBooks } from '@/hooks/useEntityWithBooks';

export const usePublisherData = (slug?: string) =>
  useEntityWithBooks<IPublisherProps, IBookProps>({
    slug,
    fetchEntity: getPublisherBySlug,
    fetchBooks: getBooksByPublisher,
  });
