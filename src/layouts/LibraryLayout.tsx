import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useLocation } from 'react-router';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import CategoryPage from '@/components/pages/CategoryPage/CategoryPage.tsx';
import { getBooksByAuthor, getCategoryBySlug } from '@/lib/getDataFromApi.ts';
import { useApi } from '@/hooks/useApi.tsx';
import BooksPage from '@/components/pages/BooksPage/BooksPage.tsx';
import { EPublicationType } from '@/lib/types';

const LibraryLayout = () => {
  const location = useLocation();
  const categoryFullSlug = location.pathname.split('/').filter(Boolean);
  const categorySlug = categoryFullSlug[categoryFullSlug.length - 1];
  const { data: category, isLoading, isError } = useApi(() => getCategoryBySlug(categorySlug));
  const { data: books, isError: booksError } = useApi(() => getBooksByAuthor('J.R.R. Tolkien'));

  const isValidLibraryPath = (): boolean => {
    return (
      categoryFullSlug.length >= 2 &&
      categoryFullSlug[0] === 'library' &&
      Object.values(EPublicationType).includes(categoryFullSlug[1].slice(0, -1) as EPublicationType)
    );
  };

  const getPublicationType = (): EPublicationType | null => {
    if (isValidLibraryPath()) {
      return categoryFullSlug[1].slice(0, -1) as EPublicationType;
    }
    return null;
  };

  const publicationType = getPublicationType();

  return (
    <Wrapper>
      {publicationType === 'book' ? (
        booksError ? null : books ? (
          <BooksPage books={books} />
        ) : null
      ) : publicationType === 'article' ? (
        <>Atricles</>
      ) : publicationType === 'online' ? (
        <>Onlines</>
      ) : isLoading ? (
        <Loader isLoading={isLoading} />
      ) : isError ? null : category ? (
        <CategoryPage category={category} />
      ) : null}
    </Wrapper>
  );
};

export default LibraryLayout;
