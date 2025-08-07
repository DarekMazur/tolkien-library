import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import BoardHeader from '@/components/atoms/BoardHeader/BoardHeader';
import BoardStats from '@/components/molecules/BoardStats/BoardStats';
import ActionsList from '@/components/molecules/ActionsList/ActionsList';
import { useBoardData } from '@/hooks/useBoardData';

/**
 * Main dashboard component that displays the board page with user statistics and actions.
 *
 * This component serves as the primary dashboard view, handling loading states, error states,
 * and rendering the main board interface when data is successfully loaded. It fetches board
 * data using the useBoardData hook and conditionally renders different UI states.
 *
 * @component
 * @returns {JSX.Element} The rendered board page component
 *
 * @example
 * // Basic usage
 * <BoardPage />
 *
 * @see {@link useBoardData} Hook used for fetching board data
 * @see {@link BoardHeader} Component for displaying board header
 * @see {@link BoardStats} Component for displaying user statistics
 * @see {@link ActionsList} Component for displaying available actions
 *
 * @description
 * The component handles three main states:
 * - Loading: Shows a loader component while data is being fetched
 * - Error: Displays an error component when data fetching fails
 * - Success: Renders the complete board interface with header, stats, and actions
 *
 * @requires user User data must be available (non-null) to render the board header
 * @requires user.role.roleName User role name is required for board header display
 *
 * @throws {Error} Implicitly handles errors through the Error component when hasError is true
 *
 */

const BoardPage = () => {
  const { user, latestUser, latestEntry, isLoading, hasError } = useBoardData();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <Wrapper>
      <BoardHeader userRole={user!.role.roleName} />
      <BoardStats latestUser={latestUser} latestEntry={latestEntry} />
      <ActionsList />
    </Wrapper>
  );
};

export default BoardPage;
