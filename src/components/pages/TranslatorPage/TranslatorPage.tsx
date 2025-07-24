import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import Error from '@/components/molecules/Error/Error';
import { useParams } from 'react-router';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import { useTranslatorData } from '@/hooks/useTranslatorData.ts';
import TranslatorInfo from '@/components/molecules/TranslatorInfo/TranslatorInfo.tsx';
import TranslatedBooksList from '@/components/molecules/TranslatedBooksList/TranslatedBooksList.tsx';

/**
 * TranslatorPage - A React component that displays information about a translator and their translated books.
 *
 * This component fetches translator data based on the URL slug parameter and renders:
 * - A loading state while data is being fetched
 * - An error state if the translator is not found or an error occurs
 * - The translator's information and list of their translated books when data is successfully loaded
 *
 * @component
 * @example
 * // Used as a route component in React Router
 * <Route path="/translator/:slug" component={TranslatorPage} />
 *
 * @returns {JSX.Element} The rendered translator page component
 *
 * @description
 * The component uses the following flow:
 * 1. Extracts the translator slug from URL parameters using useParams
 * 2. Fetches translator data using the useTranslatorData hook
 * 3. Handles three states:
 *    - Loading: Shows a Loader component
 *    - Error/Not Found: Shows error message in a Wrapper
 *    - Success: Shows TranslatorInfo and TranslatedBooksList components
 *
 * @requires useParams from 'react-router' - For accessing URL parameters
 * @requires useTranslatorData - Custom hook for fetching translator data
 * @requires Wrapper - Layout wrapper component
 * @requires Loader - Loading indicator component
 * @requires TranslatorInfo - Component for displaying translator details
 * @requires TranslatedBooksList - Component for displaying list of translated books
 * @requires Box from '@mui/material' - Material-UI container component
 *
 * @see {@link useTranslatorData} - Hook used for data fetching
 * @see {@link TranslatorInfo} - Child component for translator details
 * @see {@link TranslatedBooksList} - Child component for books list
 *
 */

const TranslatorPage = () => {
  const { slug } = useParams();
  const { translator, books, isLoading, hasError, errorMessage } = useTranslatorData(slug);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (hasError || !translator) {
    return <Error errorMessage={errorMessage || 'Translator not found'} />;
  }

  return (
    <Wrapper>
      <TranslatorInfo translator={translator} />
      <TranslatedBooksList books={books} />
    </Wrapper>
  );
};

export default TranslatorPage;
