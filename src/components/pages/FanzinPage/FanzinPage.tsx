import { ETableType, IFanzinProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import NoContent from '@/components/atoms/NoContent/NoContent.tsx';

/**
 * FanzinPage component
 *
 * Renders a table of fanzines using the GenericTable component.
 *
 * @param {Object} props - Component props
 * @param {IFanzinProps[]} props.data - Array of fanzine items to display in the table
 *
 * @returns {JSX.Element} The rendered GenericTable with fanzine data
 *
 * @example
 * const mockData: IFanzinProps[] = [
 *   {
 *     id: '1',
 *     title: 'Fanzin One',
 *     publisher: {
 *       id: '1',
 *       title: 'Publisher 1',
 *       description: '',
 *     },
 *     startDate: new Date('2025-01-01'),
 *     lastIssueDate: null,
 *   },
 *   {
 *     id: '2',
 *     title: 'Fanzin Two',
 *     publisher: {
 *       id: '1',
 *       title: 'Publisher 1',
 *       description: '',
 *     },
 *     startDate: new Date('2025-02-01'),
 *     lastIssueDate: null,
 *   },
 * ];
 * <FanzinPage data={mockData} />;
 */

const FanzinPage = ({ data }: { data: IFanzinProps[] }) => {
  if (!data) return <NoContent />;

  return <GenericTable data={data} publicationType={ETableType.FANZIN} title="Fanzins" />;
};

export default FanzinPage;
