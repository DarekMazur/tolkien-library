import { Alert, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { displayDate } from '@/lib/mockArticles.ts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  articleCardContentStyles,
  articleCardHeaderContentStyles,
  articleCardHeaderTitleStyles,
} from '@/components/molecules/ArticleCard/ArticleCard.styles.ts';

const components = {
  div: ({
    className,
    children,
    ...rest
  }: React.HTMLProps<HTMLDivElement> & { className?: string }) => {
    if (className?.includes('warning')) {
      return <Alert severity="warning">{children}</Alert>;
    }

    if (className?.includes('info')) {
      return <Alert severity="info">{children}</Alert>;
    }

    if (className?.includes('danger')) {
      return <Alert severity="error">{children}</Alert>;
    }

    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  },
};

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
            style: { articleCardHeaderTitleStyles },
          },
          content: {
            style: { articleCardHeaderContentStyles },
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
