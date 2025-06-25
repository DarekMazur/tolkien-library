import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Box, Typography } from '@mui/material';
import { articleCardContentStyles } from '@/components/molecules/ArticleCard/ArticleCard.styles.ts';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { components } from '@/lib/helpers/mdComponents.tsx';
import ReactMarkdown from 'react-markdown';
import { useIdentity } from '@/hooks/useIdentity.tsx';

const LibraryPage = () => {
  const { identity } = useIdentity();

  return (
    <Wrapper>
      <Box sx={articleCardContentStyles}>
        <Typography variant="h2">Library</Typography>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {identity && identity.libraryContent ? identity.libraryContent.value : null}
        </ReactMarkdown>
      </Box>
    </Wrapper>
  );
};

export default LibraryPage;
