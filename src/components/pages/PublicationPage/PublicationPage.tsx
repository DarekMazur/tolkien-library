import { EPublicationType, IPublicationProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import { Divider, Typography } from '@mui/material';

const PublicationPage = ({ data }: { data: IPublicationProps[] }) => {
  return (
    <>
      <Typography variant="h3">Fragmentarium</Typography>
      <Divider />
      <GenericTable
        data={data}
        publicationType={EPublicationType.ARTICLE}
        title="Items partly related to Tolkien"
      />
      <GenericTable
        data={data}
        publicationType={EPublicationType.ARTICLE}
        title="Items that contain Tolkien articles or are partially devoted to Tolkien's works"
      />
      <GenericTable data={data} publicationType={EPublicationType.ARTICLE} title="E-publications" />
    </>
  );
};

export default PublicationPage;
