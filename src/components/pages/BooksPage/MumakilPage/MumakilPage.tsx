import { ETableType, IFanEditionsProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';

const FanzinPage = ({ data }: { data: IFanEditionsProps[] }) => {
  return (
    <GenericTable data={data} publicationType={ETableType.FANEDITION} title="Fans' editions" />
  );
};

export default FanzinPage;
