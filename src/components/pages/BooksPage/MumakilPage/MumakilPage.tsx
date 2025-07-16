import { ETableType, IMumakilProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';

const FanzinPage = ({ data }: { data: IMumakilProps[] }) => {
  return <GenericTable data={data} publicationType={ETableType.MUMAKIL} title="Fans' editions" />;
};

export default FanzinPage;
