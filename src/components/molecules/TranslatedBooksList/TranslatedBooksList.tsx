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

const TranslatedBooksList = ({ books }: { books: IBookProps[] | null }) => {
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
  );
};

export default TranslatedBooksList;
