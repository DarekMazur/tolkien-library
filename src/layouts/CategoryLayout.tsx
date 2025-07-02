import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useLocation } from 'react-router';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import CategoryPage from '@/components/pages/CategoryPage/CategoryPage.tsx';
import { getBooksByAuthor, getCategoryBySlug } from '@/lib/getDataFromApi.ts';
import { useApi } from '@/hooks/useApi.tsx';
import BooksPage from '@/components/pages/BooksPage/BooksPage.tsx';

const CategoryLayout = () => {
  const location = useLocation();
  const categoryFullSlug = location.pathname.split('/');
  const categorySlug = categoryFullSlug[categoryFullSlug.length - 1];
  const { data: category, isLoading, isError } = useApi(() => getCategoryBySlug(categorySlug));
  const {
    data: books,
    isError: booksError,
    isLoading: booksLoading,
  } = useApi(() => getBooksByAuthor('J.R.R. Tolkien'));

  return (
    <Wrapper>
      {isLoading || booksLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          {isError || booksError ? null : books ? (
            <BooksPage books={books} />
          ) : category ? (
            <CategoryPage category={category} />
          ) : null}
        </>
      )}
    </Wrapper>
  );
};

export default CategoryLayout;
