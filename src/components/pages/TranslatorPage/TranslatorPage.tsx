import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTranslatorData } from '@/hooks/useTranslatorData.ts';
import TranslatorInfo from '@/components/molecules/TranslatorInfo/TranslatorInfo.tsx';

const TranslatorPage = () => {
  const { slug } = useParams();
  const { translator, books, isLoading, hasError, errorMessage } = useTranslatorData(slug);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (hasError || !translator) {
    return (
      <Wrapper>
        <Box>{errorMessage || 'Translator not found'}</Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TranslatorInfo translator={translator} />
      <Box>
        {books ? (
          <Box>
            <Typography variant="h3" component="h2" sx={{ pt: 4, pb: 2 }}>
              Translated books:
            </Typography>
            <List sx={{ width: 'fit-content' }}>
              {books.map((book) => (
                <ListItem key={book.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      console.log(`Navigate to book: ${book.originalTitle}`);
                    }}
                  >
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
        ) : (
          <Box>No translated books found</Box>
        )}
      </Box>
    </Wrapper>
  );
};

export default TranslatorPage;
