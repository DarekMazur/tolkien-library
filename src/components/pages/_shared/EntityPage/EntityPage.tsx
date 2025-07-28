import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import NoContent from '@/components/atoms/NoContent/NoContent';
import { Box, Typography } from '@mui/material';
import { ComponentType } from 'react';

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
