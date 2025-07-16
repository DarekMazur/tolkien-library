import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import Loader from '@/components/atoms/Loader/Loader';
import CategoryPage from '@/components/pages/CategoryPage/CategoryPage';
import BooksPage from '@/components/pages/BooksPage/BooksPage';
import { useLibraryData } from '@/hooks/useLibraryData';
import PublicationPage from '@/components/pages/PublicationPage/PublicationPage';
import FanZonePage from '@/components/pages/FanzonePage/FanzonePage';
import FanzinPage from '@/components/pages/FanzinPage/FanzinPage';
import FanEditionPage from '@/components/pages/FanEditionPage/FanEditionPage';

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
      {result.state === 'books' && (
        <BooksPage books={result.data} isJrr={result?.search === 'jrrt'} />
      )}
      {result.state === 'publications' && <PublicationPage data={result.data} />}
      {result.state === 'fanzone' && <FanZonePage />}
      {result.state === 'fanzin' && <FanzinPage data={result.data} />}
      {result.state === 'mumakil' && <FanEditionPage data={result.data} />}
      {result.state === 'category' && <CategoryPage category={result.data} />}
      {result.state === 'empty' && <>Nothing found...</>}
    </Wrapper>
  );
};

export default LibraryLayout;
