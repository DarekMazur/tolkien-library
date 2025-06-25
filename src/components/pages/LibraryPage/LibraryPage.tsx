import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Box, Typography } from '@mui/material';
import { articleCardContentStyles } from '@/components/molecules/ArticleCard/ArticleCard.styles.ts';
import { faker } from '@faker-js/faker';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { components } from '@/lib/helpers/mdComponents.tsx';
import ReactMarkdown from 'react-markdown';

const LibraryPage = () => {
  const generateAlertBlock = (type: string): string => {
    return `<div class='${type}'>${faker.lorem.paragraph()}</div>`;
  };

  const generateContent = (): string => {
    return `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}

- ${Array.from({ length: 5 }, () => faker.lorem.word()).join('\n- ')}

\n\n${generateAlertBlock('info')}\n\n
- ${Array.from({ length: 2 }, () => faker.lorem.word()).join('\n- ')}
\n\n${generateAlertBlock('warning')}\n\n`;
  };

  return (
    <Wrapper>
      <Box sx={articleCardContentStyles}>
        <Typography variant="h2">Library</Typography>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {generateContent()}
        </ReactMarkdown>
      </Box>
    </Wrapper>
  );
};

export default LibraryPage;
