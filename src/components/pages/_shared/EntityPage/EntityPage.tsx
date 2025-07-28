import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import Error from '@/components/molecules/Error/Error.tsx';
import NoContent from '@/components/atoms/NoContent/NoContent.tsx';
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
import PersonInfo from '@/components/molecules/PersonInfo/PersonInfo.tsx';

interface EntityPageProps<
  E extends { title?: string; description?: string },
  B extends { id: string; polishTitle: string },
> {
  hook: () => {
    entity: E | null;
    books: B[] | null;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };
  entityLabel: string;
}

export const EntityPage = <
  E extends { title?: string; description?: string },
  B extends { id: string; polishTitle: string },
>({
  hook,
  entityLabel,
}: EntityPageProps<E, B>) => {
  const { entity, books, isLoading, hasError, errorMessage } = hook();

  if (isLoading) return <Loader isLoading />;
  if (hasError) return <Error errorMessage={errorMessage || undefined} />;
  if (!entity) return <NoContent />;

  return (
    <Wrapper>
      <PersonInfo
        fullName={entity.title as string}
        roleLabel={entityLabel}
        description={entity.description}
      />

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
