import { Box } from '@mui/material';
import NewestItem from '@/components/atoms/NewestItem/NewestItem.tsx';
import { IUser, TPublications } from '@/lib/types';

interface BoardStatsProps {
  latestUser?: IUser;
  latestEntry?: TPublications;
}

const boardStats = ({ latestUser, latestEntry }: BoardStatsProps) => {
  return (
    <Box sx={{ width: '100%', py: 4, display: 'flex', justifyContent: 'space-evenly' }}>
      <NewestItem type="user" content={latestUser} />
      <NewestItem type="entry" content={latestEntry} />
    </Box>
  );
};

export default boardStats;
