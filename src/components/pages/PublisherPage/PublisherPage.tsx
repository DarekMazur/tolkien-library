import { useParams } from 'react-router';
import { usePublisherData } from '@/hooks/usePublisherData';
import EntityPage from '@/components/pages/_shared/EntityPage/EntityPage';
import { ItemList } from '@/components/molecules/ItemList/ItemList';
import { IBookProps } from '@/lib/types';
import { createSlug } from '@/lib/helpers/createSlug';
import { useNavigate } from 'react-router';
import PersonInfo from '@/components/molecules/PersonInfo/PersonInfo.tsx';

/**
 * A React component that displays a publisher's information page.
 *
 * This component renders a page showing publisher details including
 * their name, description, and a list of their published books.
 * It uses the EntityPage wrapper component to provide consistent
 * layout and data fetching patterns.
 *
 * @component
 * @example
 * // Used within React Router with a slug parameter
 * <Route path="/publishers/:slug" element={<PublisherPage />} />
 *
 * @returns {JSX.Element} The rendered publisher page component
 *
 * @description
 * The component:
 * - Extracts the publisher slug from URL parameters
 * - Fetches publisher data using the usePublisherData hook
 * - Renders publisher information using PersonInfo component
 * - Displays a list of published books using ItemList component
 * - Provides navigation to individual book pages when books are clicked
 *
 * @requires react-router - For useParams and useNavigate hooks
 * @requires @/hooks/usePublisherData - Custom hook for fetching publisher data
 * @requires @/components/pages/_shared/EntityPage/EntityPage - Wrapper component
 * @requires @/components/molecules/ItemList/ItemList - List display component
 * @requires @/components/molecules/PersonInfo/PersonInfo - Info display component
 * @requires @/lib/types - Type definitions for IBookProps
 * @requires @/lib/helpers/createSlug - Utility function for creating URL slugs
 *
 * @see {@link EntityPage} - The wrapper component used for layout
 * @see {@link usePublisherData} - Data fetching hook
 * @see {@link PersonInfo} - Component for displaying publisher information
 * @see {@link ItemList} - Component for displaying book list
 *
 */
const PublisherPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <EntityPage
      useData={() => usePublisherData(slug)}
      InfoComponent={({ entity }) => (
        <PersonInfo
          fullName={entity.title}
          roleLabel="Publisher"
          description={entity.description}
        />
      )}
      ItemsComponent={({ items }) => (
        <ItemList<IBookProps>
          items={items}
          emptyMessage="No publications found"
          getPrimaryText={(b) => b.polishTitle}
          onClickItem={(b) => navigate(`/library/books/${createSlug(b.polishTitle)}`)}
        />
      )}
      itemsSectionTitle="Publications:"
    />
  );
};

export default PublisherPage;
