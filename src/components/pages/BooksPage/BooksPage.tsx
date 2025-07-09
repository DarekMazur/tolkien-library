import { EPublicationType, IBookProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';

const BooksPage = ({ books }: { books: IBookProps[] }) => {
  return (
    <GenericTable
      data={books}
      publicationType={EPublicationType.BOOK}
      title="J.R.R. Tolkien's books catalog"
      subtitle="Publications list"
    />
  );
};

export default BooksPage;
