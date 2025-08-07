import { Box } from '@mui/material';
import NewestItem from '@/components/atoms/NewestItem/NewestItem.tsx';
import { IUser, TPublications } from '@/lib/types';

interface BoardStatsProps {
  latestUser?: IUser;
  latestEntry?: TPublications;
}

/**
 * BoardStats component displays the latest user and latest publication entry.
 *
 * @param {Object} props - Component props
 * @param {IUser} [props.latestUser] - The most recently registered user to display
 * @param {TPublications} [props.latestEntry] - The most recent publication entry to display
 *
 * @returns {JSX.Element} A layout box containing latest user and entry components
 *
 * @component
 * @example
 * <BoardStats
 *   latestUser={{ id: '123', name: 'John Doe', ... }}
 *   latestEntry={{ id: '456', title: 'New Publication', ... }}
 * />
 */

const boardStats = ({ latestUser, latestEntry }: BoardStatsProps) => {
  return (
    <Box sx={{ width: '100%', py: 4, display: 'flex', justifyContent: 'space-evenly' }}>
      <NewestItem type="user" content={latestUser} />
      <NewestItem type="entry" content={latestEntry} />
    </Box>
  );
};

export default boardStats;
