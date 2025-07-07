import { ICategoryProps } from '@/lib/types';
import { Typography } from '@mui/material';

const CategoryPage = ({ category }: { category: ICategoryProps }) => {
  return (
    <>
      <Typography variant="h2">{category.title}</Typography>
      {category.pages?.map((page) => (
        <Typography key={page.id}>
          <a href={`/library/${category.slug}/${page.slug}`}>{page.title}</a>
        </Typography>
      ))}
    </>
  );
};

export default CategoryPage;
