import NoContent from '@/components/atoms/NoContent/NoContent';
import { ICategoryProps } from '@/lib/types';
import { Typography } from '@mui/material';
import CustomLink from '@/components/atoms/CustomLink/CustomLink.tsx';

const CategoryPage = ({ category }: { category: ICategoryProps }) => {
  if (!category) {
    return <NoContent />;
  }
  return (
    <>
      <Typography variant="h2">{category.title}</Typography>
      {category.pages?.map((page) => (
        <Typography key={page.id}>
          <CustomLink href={`/library/${category.slug}/${page.slug}`}>{page.title}</CustomLink>
        </Typography>
      ))}
    </>
  );
};

export default CategoryPage;
