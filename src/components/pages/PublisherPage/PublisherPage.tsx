import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useParams } from 'react-router';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const PublisherPage = () => {
  const { slug } = useParams();

  return (
    <Wrapper>
      <Box>
        <Typography variant="h2" component="h1">
          Publisher title for {slug}
        </Typography>
        <Typography variant="h3" component="h2" color="text.secondary">
          Publisher
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Publisher description
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3" component="h2" sx={{ pt: 4, pb: 2 }}>
          Publications:
        </Typography>
        <List sx={{ width: 'fit-content' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${slug} books list`}
                slotProps={{
                  primary: {
                    variant: 'body1',
                    sx: { fontWeight: 'medium' },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Wrapper>
  );
};

export default PublisherPage;
