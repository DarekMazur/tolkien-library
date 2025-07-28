import { useParams } from 'react-router';
import { usePublisherData } from '@/hooks/usePublisherData';
import EntityPage from '@/components/pages/_shared/EntityPage/EntityPage';
import { ItemList } from '@/components/molecules/ItemList/ItemList';
import { IBookProps } from '@/lib/types';
import { createSlug } from '@/lib/helpers/createSlug';
import { useNavigate } from 'react-router';
import PersonInfo from '@/components/molecules/PersonInfo/PersonInfo.tsx';

const PublisherPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <EntityPage
      useData={() => usePublisherData(slug)}
      InfoComponent={({ entity }) => (
        <PersonInfo
          fullName={entity.title}
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

export default PublisherPage;
