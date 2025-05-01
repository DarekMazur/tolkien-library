import { generateMockNews } from '@/lib/mockArticles.ts';
import ArticleCard from '@/components/molecules/ArticleCard/ArticleCard.tsx';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';

const Home = () => {
  return (
    <Wrapper>
      {generateMockNews(6).map((item) => (
        <ArticleCard key={item.id} item={item} />
      ))}
    </Wrapper>
  );
};

export default Home;
