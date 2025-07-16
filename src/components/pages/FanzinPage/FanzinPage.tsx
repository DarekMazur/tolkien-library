import { ETableType, IFanzinProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';

const FanzinPage = ({ data }: { data: IFanzinProps[] }) => {
  return <GenericTable data={data} publicationType={ETableType.FANZIN} title="Fanzins" />;
};

export default FanzinPage;
