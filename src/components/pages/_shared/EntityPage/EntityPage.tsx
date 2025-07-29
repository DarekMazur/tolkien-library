import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import NoContent from '@/components/atoms/NoContent/NoContent';
import { Box, Typography } from '@mui/material';
import { ComponentType } from 'react';

/**
 * A generic page component for displaying entity information with optional related items.
 * Handles loading states, error states, and conditional rendering of entity data and associated items.
 *
 * @template E - The type of the main entity object
 * @template I - The type of the items/books objects (defaults to never if not provided)
 *
 * @param {Object} props - The component props
 * @param {Function} props.useData - Custom hook that provides entity data, items, and loading/error states
 * @param {Function} props.useData.return - Return object from useData hook
 * @param {E | null} props.useData.return.entity - The main entity data or null if not loaded
 * @param {I[] | null} props.useData.return.books - Array of related items/books or null if not loaded
 * @param {boolean} props.useData.return.isLoading - Loading state indicator
 * @param {boolean} props.useData.return.hasError - Error state indicator
 * @param {string | null} props.useData.return.errorMessage - Error message or null if no error
 * @param {ComponentType<{ entity: E }>} props.InfoComponent - Component to render entity information
 * @param {ComponentType<{ items: I[] | null }>} [props.ItemsComponent] - Optional component to render related items
 * @param {string} [props.itemsSectionTitle="Items:"] - Title for the items section
 *
 * @returns {JSX.Element} The rendered entity page component
 *
 * @example
 * ```
 * // Usage with a book entity and author items
 * interface Book {
 *   id: string;
 *   title: string;
 *   description: string;
 * }
 *
 * interface Author {
 *   id: string;
 *   name: string;
 * }
 *
 * const BookPage = () => (
 *   <EntityPage<Book, Author>
 *     useData={useBookData}
 *     InfoComponent={BookInfo}
 *     ItemsComponent={AuthorsList}
 *     itemsSectionTitle="Authors:"
 *   />
 * );
 * ```
 *
 * @example
 * ```
 * // Usage without items component
 * const AuthorPage = () => (
 *   <EntityPage<Author>
 *     useData={useAuthorData}
 *     InfoComponent={AuthorInfo}
 *   />
 * );
 * ```
 *
 * @see {@link Wrapper} - Layout wrapper component
 * @see {@link Loader} - Loading state component
 * @see {@link Error} - Error state component
 * @see {@link NoContent} - No content state component
 */
interface EntityPageProps<E extends object, I extends object = never> {
  useData: () => {
    entity: E | null;
    books: I[] | null;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };
  InfoComponent: ComponentType<{ entity: E }>;
  ItemsComponent?: ComponentType<{ items: I[] | null }>;
  itemsSectionTitle?: string;
}

const EntityPage = <E extends object, I extends object = never>({
  useData,
  InfoComponent,
  ItemsComponent,
  itemsSectionTitle = 'Items:',
}: EntityPageProps<E, I>) => {
  const { entity, books, isLoading, hasError, errorMessage } = useData();

  if (isLoading) return <Loader isLoading />;
  if (hasError) return <Error errorMessage={errorMessage ?? 'Unknown error'} />;
  if (!entity) return <NoContent />;

  return (
    <Wrapper>
      <InfoComponent entity={entity} />

      {ItemsComponent && (
        <Box sx={{ pt: 4 }}>
          <Typography variant="h3" component="h2" sx={{ pb: 2 }}>
            {itemsSectionTitle}
          </Typography>
          <ItemsComponent items={books} />
        </Box>
      )}
    </Wrapper>
  );
};

export default EntityPage;
