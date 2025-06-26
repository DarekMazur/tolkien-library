import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';

const createSlug = (title: string) => {
  return slugify(title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: 'pl',
    trim: true,
  });
};

const categoryTitle = faker.lorem.words({ min: 1, max: 2 });

const mockedCategory = {
  id: faker.string.uuid(),
  title: categoryTitle,
  slug: createSlug(categoryTitle),
  pages: [
    {
      title: faker.lorem.words({ min: 1, max: 4 }),
    },
    {
      title: faker.lorem.words({ min: 1, max: 4 }),
    },
    {
      title: faker.lorem.words({ min: 1, max: 4 }),
    },
    {
      title: faker.lorem.words({ min: 1, max: 4 }),
    },
  ],
};

const CategoryLayout = () => {
  const location = useLocation();

  const categoryFullSlug = location.pathname.split('/');

  const categorySlug = categoryFullSlug[categoryFullSlug.length - 1];

  return (
    <Wrapper>
      <Typography variant="h2">{mockedCategory.title}</Typography>
      {mockedCategory.pages.map((page) => (
        <Typography>
          <a href={`/library/${categorySlug}/${createSlug(page.title)}`}>{page.title}</a>
        </Typography>
      ))}
    </Wrapper>
  );
};

export default CategoryLayout;
