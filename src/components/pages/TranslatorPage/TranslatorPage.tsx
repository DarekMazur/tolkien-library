import { useNavigate, useParams } from 'react-router';
import { useTranslatorData } from '@/hooks/useTranslatorData.ts';
import PersonInfo from '@/components/molecules/PersonInfo/PersonInfo.tsx';
import { ItemList } from '@/components/molecules/ItemList/ItemList.tsx';
import { IBookProps } from '@/lib/types';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import EntityPage from '@/components/pages/_shared/EntityPage/EntityPage.tsx';

const TranslatorPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <EntityPage
      useData={() => useTranslatorData(slug)}
      InfoComponent={({ entity }) => (
        <PersonInfo
          fullName={`${entity.firstName} ${entity.lastName}`}
          roleLabel="Publisher"
          description={entity.description}
        />
      )}
      ItemsComponent={({ items }) => (
        <ItemList<IBookProps>
          items={items}
          emptyMessage="No publications found"
          getPrimaryText={(b) => b.polishTitle}
          onClickItem={(b) => navigate(`/library/books/${createSlug(b.polishTitle)}`)}
        />
      )}
      itemsSectionTitle="Publications:"
    />
  );
};

export default TranslatorPage;
