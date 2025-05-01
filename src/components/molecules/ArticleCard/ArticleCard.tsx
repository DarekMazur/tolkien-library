import { Alert, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { displayDate } from '@/lib/mockArticles.ts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import quoteIcon from '@/assets/vector/quote.svg?url';

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
            style: {
              fontFamily: '"Montserrat Variable", sans-serif',
              fontSize: '1.2rem',
              fontWeight: 700,
            },
          },
          content: {
            style: {
              display: 'flex',
              gap: '1rem',
            },
          },
        }}
        title={displayDate(item.date)}
        subheader={item.category || null}
      />
      <Divider />
      <CardContent
        sx={{
          '& blockquote': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'lightGrey',
            color: 'darkBlue',
            margin: '1rem 0',
            fontStyle: 'italic',
            minHeight: 48,
            pl: '5rem',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: 48,
              height: '100%',
              backgroundColor: 'grey',
              backgroundImage: `url("${quoteIcon}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 24,
            },
          },
          '& table': {
            m: '2rem auto',
            borderSpacing: 0,
            border: '0.5px solid black',
            '& th': { backgroundColor: 'lightGrey' },
            '& td, & th': {
              border: '0.5px solid black',
              p: '1rem 2rem',
              textAlign: 'center',
            },
          },
        }}
      >
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
