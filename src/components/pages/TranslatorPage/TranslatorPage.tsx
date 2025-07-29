import { useNavigate, useParams } from 'react-router';
import { useTranslatorData } from '@/hooks/useTranslatorData.ts';
import PersonInfo from '@/components/molecules/PersonInfo/PersonInfo.tsx';
import ItemList from '@/components/molecules/ItemList/ItemList.tsx';
import { IBookProps } from '@/lib/types';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import EntityPage from '@/components/pages/_shared/EntityPage/EntityPage.tsx';

/**
 * TranslatorPage component renders a dedicated page for displaying translator information
 * and their associated publications. Uses the EntityPage pattern for consistent layout
 * and data fetching.
 *
 * @component
 * @returns {JSX.Element} The rendered translator page with personal info and publications list
 *
 * @example
 * // Route usage in React Router
 * <Route path="/translators/:slug" element={<TranslatorPage />} />
 *
 * @description
 * This component:
 * - Extracts translator slug from URL parameters
 * - Fetches translator data using useTranslatorData hook
 * - Renders translator personal information (name, role, description)
 * - Displays a list of publications translated by the person
 * - Provides navigation to individual book pages when items are clicked
 *
 * @requires react-router - For useNavigate and useParams hooks
 * @requires useTranslatorData - Custom hook for fetching translator data
 * @requires PersonInfo - Component for displaying personal information
 * @requires ItemList - Generic list component for displaying items
 * @requires EntityPage - Shared page template component
 * @requires createSlug - Helper function for generating URL-friendly slugs
 *
 * @since 1.0.0
 */
const TranslatorPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <EntityPage
      useData={() => useTranslatorData(slug)}
      InfoComponent={({ entity }) => (
        <PersonInfo
          fullName={`${entity.firstName} ${entity.lastName}`}
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

export default TranslatorPage;
