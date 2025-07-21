import { IBookProps } from '@/lib/types';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router';
import { createSlug } from '@/lib/helpers/createSlug.ts';

const TranslatedBooksList = ({ books }: { books: IBookProps[] | null }) => {
  const navigate = useNavigate();

  if (!books || books.length === 0) {
    return (
      <Box>
        <Typography variant="h3" component="h2" sx={{ pt: 4, pb: 2 }}>
          Translated books:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No translated books found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3" component="h2" sx={{ pt: 4, pb: 2 }}>
        Translated books:
      </Typography>
      <List sx={{ width: 'fit-content' }}>
        {books.map((book) => (
          <ListItem key={book.id} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/library/books/${createSlug(book.polishTitle)}`);
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
  );
};

export default TranslatedBooksList;
