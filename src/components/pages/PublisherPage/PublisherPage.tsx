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
import { useApi } from '@/hooks/useApi.tsx';
import { getPublisherBySlug } from '@/lib/getDataFromApi';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import NoContent from '@/components/atoms/NoContent/NoContent.tsx';

const PublisherPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, errorMessage } = useApi(() => getPublisherBySlug(slug!));

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError || !slug) {
    return <Error errorMessage={errorMessage || 'Unknown error'} />;
  }

  if (!data) {
    return <NoContent />;
  }

  return (
    <Wrapper>
      <Box>
        <Typography variant="h2" component="h1">
          {data.title}
        </Typography>
        <Typography variant="h3" component="h2" color="text.secondary">
          Publisher
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {data.description}
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
                primary={`${data.title} books list`}
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
