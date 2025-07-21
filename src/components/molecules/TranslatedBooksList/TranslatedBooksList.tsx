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

export interface TranslatedBooksListProps {
  /**
   * Array of book objects to display in the translated books list.
   * If null or empty, a message indicating no translated books will be shown.
   */
  books: IBookProps[] | null;
}

/**
 * Renders a list of translated books.
 * If the `books` array is null or empty, displays a message indicating
 * that no translated books were found. Otherwise, displays each book’s
 * Polish title in a Material UI List. Clicking on a list item navigates
 * to the book’s detail page, using a slug created from the Polish title.
 *
 * @param {TranslatedBooksListProps} props - Component props.
 * @param {IBookProps[] | null} props.books - The list of translated books to render.
 *
 * @returns {JSX.Element} A section containing either a "no translated books"
 * message or a navigable list of book titles.
 */

const TranslatedBooksList = ({ books }: TranslatedBooksListProps) => {
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
