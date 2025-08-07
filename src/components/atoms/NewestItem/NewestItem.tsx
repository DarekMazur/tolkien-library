import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { IUser, TPublications } from '@/lib/types';
import { useNewestItemData } from '@/hooks/useNewestItemData';

interface NewestItemProps {
  type: 'user' | 'entry';
  content?: IUser | TPublications;
}

const NewestItem = ({ type, content }: NewestItemProps) => {
  const { itemData, isLoading } = useNewestItemData(type, content);

  if (isLoading) {
    return null;
  }

  const title = type === 'user' ? 'Newest User' : 'Newest Entry';

  return (
    <Box>
      <Typography variant="h3" component="h4">
        {title}
      </Typography>
      <Typography>
        {itemData.link ? (
          <Link component={RouterLink} to={itemData.link}>
            {itemData.displayText}
          </Link>
        ) : (
          itemData.displayText
        )}
      </Typography>
    </Box>
  );
};

export default NewestItem;
