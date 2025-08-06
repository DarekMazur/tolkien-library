import { Box, Link, Typography } from '@mui/material';
import { formatDate } from '@/lib/helpers/formatDate.ts';
import { IUser, TPublications } from '@/lib/types';
import { getLatest } from '@/lib/helpers/getLatest.ts';
import { isBook, isPublisher, isTranslator } from '@/lib/helpers/publicationsTypeGuard.ts';
import { Link as RouterLink } from 'react-router';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { useMe } from '@/hooks/useMe.tsx';

const NewestItem = ({
  type,
  content,
}: {
  type: 'user' | 'entry';
  content?: IUser | TPublications;
}) => {
  const { user, isLoading } = useMe();

  const title = type === 'user' ? 'Newest User' : 'Newest Entry';

  if (isLoading) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h3" component="h4">
        {title}
      </Typography>
      <Typography>
        {type === 'user' ? (
          content ? (
            `${(content as IUser)?.userName} (${content?.id === user?.id ? 'you' : formatDate(content!.createdAt)})`
          ) : (
            'No users'
          )
        ) : content &&
          getLatest(content as TPublications) &&
          (isBook(content) || isTranslator(content) || isPublisher(content)) ? (
          <Link
            component={RouterLink}
            to={`/library/${isBook(content) ? 'books' : isTranslator(content) ? 'translator' : 'publisher'}/${createSlug(getLatest(content)!)}`}
          >
            {getLatest(content)} ({formatDate(content!.createdAt)})
          </Link>
        ) : (
          `${getLatest(content as TPublications)} (${formatDate(content!.createdAt)})`
        )}
      </Typography>
    </Box>
  );
};

export default NewestItem;
