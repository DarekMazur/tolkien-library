import { generateMockNews } from '@/lib/mockArticles.ts';
import ArticleCard from '@/components/molecules/ArticleCard/ArticleCard.tsx';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <Wrapper>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Lorem Ipsum
      </Typography>
      {generateMockNews(6).map((item) => (
        <ArticleCard key={item.id} item={item} />
      ))}
    </Wrapper>
  );
};

export default Home;
