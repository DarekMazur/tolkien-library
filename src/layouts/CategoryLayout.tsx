import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { useCategory } from '@/hooks/useCategory.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';

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
        <>
          {isError || !category ? null : (
            <>
              <Typography variant="h2">{category.title}</Typography>
              {category.pages?.map((page) => (
                <Typography key={page.id}>
                  <a href={`/library/${category.slug}/${page.slug}`}>{page.title}</a>
                </Typography>
              ))}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default CategoryLayout;
