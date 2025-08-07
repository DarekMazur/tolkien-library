import { useMemo } from 'react';
import { useMe } from '@/hooks/useMe';
import { IUser } from '@/lib/types';
import { useGetLatestQuery, useGetUsersQuery } from '../../store';

export const useBoardData = () => {
  const { data: usersData, isLoading: usersLoading, isError: usersError } = useGetUsersQuery();
  const { data: entryData, isLoading: entryLoading, isError: entryError } = useGetLatestQuery();
  const { user, isLoading: userLoading } = useMe();

  const latestUser = useMemo((): IUser | undefined => {
    if (!usersData?.length) return undefined;

    return [...usersData].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  }, [usersData]);

  const isLoading = userLoading || usersLoading || entryLoading;
  const hasError = !user || usersError || entryError;

  return {
    user,
    latestUser,
    latestEntry: entryData,
    isLoading,
    hasError,
  };
};
