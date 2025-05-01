import ArticleCard from '@/components/molecules/ArticleCard/ArticleCard.tsx';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Typography } from '@mui/material';
import { useGetArticlesQuery } from '../../../../store';

const Home = () => {
  const { data: newsList } = useGetArticlesQuery();

  return (
    <Wrapper>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Lorem Ipsum
      </Typography>
      {newsList && newsList.length > 0
        ? newsList.map((item) => <ArticleCard key={item.id} item={item} />)
        : null}
    </Wrapper>
  );
};

export default Home;
