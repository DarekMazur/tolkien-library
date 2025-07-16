import { ETableType, IFanEditionsProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';

const FanEditionPage = ({ data }: { data: IFanEditionsProps[] }) => {
  return (
    <GenericTable data={data} publicationType={ETableType.FANEDITION} title="Fans' editions" />
  );
};

export default FanEditionPage;
