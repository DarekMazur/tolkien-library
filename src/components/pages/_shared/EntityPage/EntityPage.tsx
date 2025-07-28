import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import Error from '@/components/molecules/Error/Error.tsx';
import NoContent from '@/components/atoms/NoContent/NoContent.tsx';
import PersonInfo from '@/components/molecules/PersonInfo/PersonInfo.tsx';
import { ItemList } from '@/components/molecules/ItemList/ItemList.tsx';

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
  itemsSectionTitle: string;
}

export const EntityPage = <
  E extends { title?: string; description?: string },
  B extends { id: string; polishTitle: string },
>({
  hook,
  entityLabel,
  itemsSectionTitle = 'Items:',
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

      <ItemList
        items={books}
        header={itemsSectionTitle}
        getPrimaryText={(book) => book.polishTitle}
      />
    </Wrapper>
  );
};
