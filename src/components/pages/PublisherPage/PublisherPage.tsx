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
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import NoContent from '@/components/atoms/NoContent/NoContent.tsx';
import { usePublisherData } from '@/hooks/usePublisherData.ts';

const PublisherPage = () => {
  const { slug } = useParams();
  const { publisher, books, isLoading, hasError, errorMessage } = usePublisherData(slug!);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (hasError || !slug) {
    return <Error errorMessage={errorMessage || 'Unknown error'} />;
  }

  if (!publisher) {
    return <NoContent />;
  }

  return (
    <Wrapper>
      <Box>
        <Typography variant="h2" component="h1">
          {publisher.title}
        </Typography>
        <Typography variant="h3" component="h2" color="text.secondary">
          Publisher
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {publisher.description}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3" component="h2" sx={{ pt: 4, pb: 2 }}>
          Publications:
        </Typography>
        <List sx={{ width: 'fit-content' }}>
          {books?.map((book) => (
            <ListItem key={book.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <KeyboardArrowRightIcon />
                </ListItemIcon>
                <ListItemText
                  primary={book.polishTitle}
                  slotProps={{
                    primary: {
                      variant: 'body1',
                      sx: { fontWeight: 'medium' },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Wrapper>
  );
};

export default PublisherPage;
