import { EPublicationType, IPublicationProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import { Divider, Typography } from '@mui/material';

const PublicationPage = ({ data }: { data: IPublicationProps[] }) => {
  const partialPublications: IPublicationProps[] = data.filter((item) => item.type === 'partial');
  const includingPublications: IPublicationProps[] = data.filter(
    (item) => item.type === 'including',
  );
  const epubPublications: IPublicationProps[] = data.filter((item) => item.type === 'epub');

  return (
    <>
      <Typography variant="h2" component="h3">
        Fragmentarium
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {partialPublications.length > 0 ? (
        <GenericTable
          data={data.filter((item) => item.type === 'partial')}
          publicationType={EPublicationType.ARTICLE}
          title="Items partly related to Tolkien"
        />
      ) : null}
      {includingPublications.length > 0 ? (
        <GenericTable
          data={data.filter((item) => item.type === 'including')}
          publicationType={EPublicationType.ARTICLE}
          title="Items that contain Tolkien articles or are partially devoted to Tolkien's works"
        />
      ) : null}
      {epubPublications.length > 0 ? (
        <GenericTable
          data={data.filter((item) => item.type === 'epub')}
          publicationType={EPublicationType.ARTICLE}
          title="E-publications"
        />
      ) : null}
    </>
  );
};

export default PublicationPage;
