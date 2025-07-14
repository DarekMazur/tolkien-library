import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import Loader from '@/components/atoms/Loader/Loader';
import CategoryPage from '@/components/pages/CategoryPage/CategoryPage';
import BooksPage from '@/components/pages/BooksPage/BooksPage';
import { useLibraryData } from '@/hooks/useLibraryData';

const LibraryLayout = () => {
  const result = useLibraryData();

  if (result.state === 'loading') {
    return (
      <Wrapper>
        <Loader isLoading />
      </Wrapper>
    );
  }

  if (result.state === 'error' || result.state === 'invalid') {
    return null;
  }

  return (
    <Wrapper>
      {result.state === 'books' && <BooksPage books={result.data} />}
      {result.state === 'publications' && <>Publications list</>}
      {result.state === 'online' && <>Online list</>}
      {result.state === 'category' && <CategoryPage category={result.data} />}
      {result.state === 'empty' && <>Nothing found...</>}
    </Wrapper>
  );
};

export default LibraryLayout;
