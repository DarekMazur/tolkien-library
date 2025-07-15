import { EPublicationType, ETableType, IPublicationProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import { Divider, Typography } from '@mui/material';

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
      {data.length > 0 ? (
        <>
          {partialPublications.length > 0 ? (
            <GenericTable
              data={data.filter((item) => item.type === EPublicationType.PARTIAL)}
              publicationType={ETableType.ARTICLE}
              title="Items partly related to Tolkien"
            />
          ) : null}
          {includingPublications.length > 0 ? (
            <GenericTable
              data={data.filter((item) => item.type === EPublicationType.INCLUDING)}
              publicationType={ETableType.ARTICLE}
              title="Items that contain Tolkien articles or are partially devoted to Tolkien's works"
            />
          ) : null}
          {epubPublications.length > 0 ? (
            <GenericTable
              data={data.filter((item) => item.type === EPublicationType.EPUB)}
              publicationType={ETableType.ARTICLE}
              title="E-publications"
            />
          ) : null}
        </>
      ) : (
        <Typography>No publications found</Typography>
      )}
    </>
  );
};

export default PublicationPage;
