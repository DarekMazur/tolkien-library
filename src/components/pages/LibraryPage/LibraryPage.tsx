import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
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
  } = useApi(() => getPageBySlug(location.pathname.slice(1)));

  return (
    <Wrapper>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : isError || !page ? null : (
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
      )}
    </Wrapper>
  );
};

export default LibraryPage;
