import Wrapper from '@/components/atoms/Wrapper/Wrapper';
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
import { useParams } from 'react-router';
import { useApi } from '@/hooks/useApi.tsx';
import { getBooksByTranslator, getTranslatorBySlug } from '@/lib/getDataFromApi.ts';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const TranslatorPage = () => {
  const { slug } = useParams();
  const { data, isError, isLoading } = useApi(() => getTranslatorBySlug(slug!));
  const {
    data: booksData,
    isError: booksError,
    isLoading: booksLoading,
  } = useApi(() => getBooksByTranslator(data!.id), { enabled: !!data?.id });

  if (isLoading || booksLoading) {
    return <Loader isLoading={isLoading} />;
  }

  console.log(booksData);

  return (
    <Wrapper>
      {!isError && !booksError && data ? (
        <>
          <Typography variant="h2">{`${data.firstName} ${data.lastName}`}</Typography>
          <Typography variant="h3">Translator</Typography>
          <Divider sx={{ my: 4 }} />
          <Box>
            {data.description}
            {booksData ? (
              <>
                <Typography variant="h3" sx={{ pt: 4, pb: 2 }}>
                  Translated books:
                </Typography>
                <List sx={{ width: 'fit-content', listStyle: 'circle' }}>
                  {booksData?.map((book) => (
                    <ListItem key={book.id}>
                      <ListItemButton>
                        <ListItemIcon>
                          <KeyboardArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary={book.polishTitle} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Box>No translated books found</Box>
            )}
          </Box>
        </>
      ) : null}
    </Wrapper>
  );
};

export default TranslatorPage;
