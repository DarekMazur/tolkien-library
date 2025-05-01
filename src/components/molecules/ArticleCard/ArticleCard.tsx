import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  articleCardContentStyles,
  articleCardHeaderContentStyles,
  articleCardHeaderSubtitleStyles,
  articleCardHeaderTitleStyles,
} from '@/components/molecules/ArticleCard/ArticleCard.styles.ts';
import { components } from '@/lib/helpers/mdComponents.tsx';
import { displayDate } from '@/lib/helpers/displayDate.ts';

const ArticleCard = ({
  item,
}: {
  item: { id: string; date: Date; category?: string; content: string };
}) => {
  return (
    <Card elevation={0} sx={{ my: '2rem' }}>
      <CardHeader
        slotProps={{
          title: {
            style: articleCardHeaderTitleStyles,
          },
          subheader: {
            style: articleCardHeaderSubtitleStyles,
          },
          content: {
            style: articleCardHeaderContentStyles,
          },
        }}
        title={displayDate(item.date)}
        subheader={item.category || null}
      />
      <Divider />
      <CardContent sx={articleCardContentStyles}>
        <Typography variant="body2" component="article" sx={{ color: 'text.secondary' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {item.content}
          </ReactMarkdown>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
