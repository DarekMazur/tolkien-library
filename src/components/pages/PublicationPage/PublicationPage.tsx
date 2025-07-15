import { EPublicationType, ETableType, IPublicationProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import { Divider, Typography } from '@mui/material';
import { useCallback } from 'react';

/**
 * A site with Tolkien publications divided into three categories.
 * (`partial`, `including`, `epub`) and displayed in separate tables.
 *
 * Sections:
 *  • Items partially related to Tolkien (`partial`)
 *  • With Tolkien elements - items containing articles about Tolkien or
 *    only partially devoted to him (`including`)
 *  • E-editions - electronic publications (`epub`)
 *
 * @component
 * @param {{ data: IPublicationProps[] }} props
 *        props.data – publication array; each object must contain at least
 *        fields:
 *        • `id: string | number` – unique identifier
 *        • `type: 'partial' | 'including' | 'epub'` – record category
 *        • `title: string` – heading
 *        • Additional fields from `IPublicationProps` are also supported.
 * @returns {ReactElement} JSX structure with a header and up to three tables.
 *
 * @example
 * ```
 * import { fetchPublications } from '@/api';
 *
 * const data = await fetchPublications();
 *
 * <PublicationPage data={data} />;
 * ```
 */

interface PublicationPageProps {
  data: IPublicationProps[];
}

const PublicationPage = ({ data = [] }: PublicationPageProps) => {
  if (!Array.isArray(data)) {
    return <Typography>Error: Incorrect data format</Typography>;
  }

  const renderTable = useCallback(
    (type: EPublicationType, title: string) => {
      const filteredData = data.filter((item) => item.type === type);
      return (
        filteredData.length > 0 && (
          <GenericTable
            data={filteredData}
            publicationType={ETableType.ARTICLE}
            title={title}
            headerVariant="h3"
          />
        )
      );
    },
    [data],
  );

  return (
    <>
      <Typography variant="h2" component="h3">
        Fragmentarium
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {data.length > 0 ? (
        <>
          {renderTable(EPublicationType.PARTIAL, 'Items partly related to Tolkien')}
          {renderTable(
            EPublicationType.INCLUDING,
            "Items that contain Tolkien articles or are partially devoted to Tolkien's works",
          )}
          {renderTable(EPublicationType.EPUB, 'E-publications')}
        </>
      ) : (
        <Typography>No publications found</Typography>
      )}
    </>
  );
};

export default PublicationPage;
