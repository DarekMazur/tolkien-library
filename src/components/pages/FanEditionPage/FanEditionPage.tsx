import { ETableType, IFanEditionsProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import { Divider, Typography } from '@mui/material';

const FanEditionPage = ({ data }: { data: IFanEditionsProps[] }) => {
  return (
    <>
      <Typography variant="h2" component="h3">
        Fan's Editions
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {data.filter((item) => item.isMumakil).length > 0 ? (
        <GenericTable
          data={data.filter((item) => item.isMumakil)}
          publicationType={ETableType.FANEDITION}
          title="MumakiL Fandom PresSsss..."
          headerVariant="h3"
        />
      ) : null}
      {data.filter((item) => !item.isMumakil).length > 0 ? (
        <GenericTable
          data={data.filter((item) => !item.isMumakil)}
          publicationType={ETableType.FANEDITION}
          title="Others"
          headerVariant="h3"
        />
      ) : null}
    </>
  );
};

export default FanEditionPage;
