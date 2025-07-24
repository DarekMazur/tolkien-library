import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import Error from '@/components/molecules/Error/Error';
import { Box, Typography } from '@mui/material';
import { articleCardContentStyles } from '@/components/molecules/ArticleCard/ArticleCard.styles.ts';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { components } from '@/lib/helpers/mdComponents.tsx';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import { getPageBySlug } from '@/lib/getDataFromApi.ts';
import { useApi } from '@/hooks/useApi.tsx';

const LibraryPage = () => {
  const location = useLocation();
  const {
    data: page,
    isError,
    isLoading,
    errorMessage,
  } = useApi(() => getPageBySlug(location.pathname.slice(1)));

  if (!isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError || !page) {
    return <Error errorMessage={errorMessage || undefined} />;
  }

  return (
    <Wrapper>
      <Box sx={articleCardContentStyles}>
        <Typography variant="h2">{page.title}</Typography>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {page.content}
        </ReactMarkdown>
      </Box>
    </Wrapper>
  );
};

export default LibraryPage;
