import { ETableType, IBookProps } from '@/lib/types';
import GenericTable from '@/components/organisms/GenericTable/GenericTable.tsx';
import NoContent from '@/components/atoms/NoContent/NoContent.tsx';

const BooksPage = ({ books, isJrr }: { books: IBookProps[]; isJrr?: boolean }) => {
  if (!books) {
    return <NoContent />;
  }

  return (
    <GenericTable
      data={books}
      publicationType={ETableType.BOOK}
      title={isJrr ? "J.R.R. Tolkien's books catalog" : 'Tolkienarium'}
      subtitle={isJrr ? 'Publications list' : 'Tolkienistic books published in Polish'}
    />
  );
};

export default BooksPage;
