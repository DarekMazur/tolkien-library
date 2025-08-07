import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';
import BoardHeader from '@/components/atoms/BoardHeader/BoardHeader';
import BoardStats from '@/components/molecules/BoardStats/BoardStats';
import ActionsList from '@/components/molecules/ActionsList/ActionsList';
import { useBoardData } from '@/hooks/useBoardData';

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
