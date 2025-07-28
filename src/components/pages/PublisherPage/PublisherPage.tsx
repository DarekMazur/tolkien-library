import { useParams } from 'react-router';
import { usePublisherData } from '@/hooks/usePublisherData';
import { EntityPage } from '@/components/pages/_shared/EntityPage/EntityPage.tsx';

const PublisherPage = () => {
  const { slug } = useParams();
  return <EntityPage hook={() => usePublisherData(slug)} entityLabel="Publisher" />;
};

export default PublisherPage;
