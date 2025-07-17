import { ETableType, IFanEditionsProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import { Divider, Typography } from '@mui/material';
import NoContent from '@/components/atoms/NoContent/NoContent.tsx';

/**
 * FanEditionPage component displays fan editions in a structured layout with two separate tables.
 *
 * This component renders a page showing fan editions divided into two categories:
 * - MumakiL Fandom publications (items with isMumakil: true)
 * - Other fan publications (items with isMumakil: false)
 *
 * Each table is conditionally rendered only if there are items in that category.
 * The component uses Material-UI components for styling and layout.
 *
 * @component
 * @param {Object} props - The component props
 * @param {IFanEditionsProps[]} props.data - Array of fan edition items to display
 * @returns {JSX.Element} The rendered fan edition page with conditional tables
 *
 * @example
 * ```
 * const fanEditions = [
 *   { id: '1', title: 'Mumakil Edition', isMumakil: true, year: 2023 },
 *   { id: '2', title: 'Other Edition', isMumakil: false, year: 2024 }
 * ];
 *
 * <FanEditionPage data={fanEditions} />
 * ```
 *
 * @example
 * // With empty data
 * <FanEditionPage data={[]} />
 *
 * @example
 * // With only MumakiL editions
 * const mumakilOnly = [
 *   { id: '1', title: 'MumakiL Edition', isMumakil: true, year: 2023 }
 * ];
 * <FanEditionPage data={mumakilOnly} />
 */

const FanEditionPage = ({ data }: { data: IFanEditionsProps[] }) => {
  return (
    <>
      <Typography variant="h2" component="h3">
        Fan's Editions
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {!data && <NoContent />}
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
