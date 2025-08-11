import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { IUser, TPublications } from '@/lib/types';
import { useNewestItemData } from '@/hooks/useNewestItemData';

interface NewestItemProps {
  type: 'user' | 'entry';
  content?: IUser | TPublications;
}

/**
 * Component displaying the newest item of a given type (user or entry).
 *
 * @param {object} props - Component props.
 * @param {'user' | 'entry'} props.type - Specifies whether to display the newest user or entry.
 * @param {IUser | TPublications} [props.content] - Optional content data used to fetch the newest item details.
 *
 * @returns {JSX.Element | null} The rendered component showing the newest item's title and a link or text.
 *
 * @example
 * // Display newest user with optional content
 * <NewestItem type="user" content={someUserObject} />
 *
 * @example
 * // Display newest entry without content
 * <NewestItem type="entry" />
 */

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
