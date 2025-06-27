import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useLocation } from 'react-router';
import { useCategory } from '@/hooks/useCategory.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import CategoryPage from '@/components/pages/CategoryPage/CategoryPage.tsx';

const CategoryLayout = () => {
  const location = useLocation();
  const categoryFullSlug = location.pathname.split('/');
  const categorySlug = categoryFullSlug[categoryFullSlug.length - 1];
  const { category, isLoading, isError } = useCategory(categorySlug);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>{isError || !category ? null : <CategoryPage category={category} />}</>
      )}
    </Wrapper>
  );
};

export default CategoryLayout;
