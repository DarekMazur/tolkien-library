import { useMemo } from 'react';
import { useMe } from '@/hooks/useMe';
import { IUser } from '@/lib/types';
import { useGetLatestQuery, useGetUsersQuery } from '../../store';

/**
 * Custom hook to fetch and manage board-related data.
 *
 * This hook consolidates user data, the latest entry data, and the current user information,
 * while also providing loading and error states for convenience.
 *
 * @returns {{
 *   user: IUser | null;           // Current authenticated user data
 *   latestUser: IUser | undefined; // The most recently created user from the users list
 *   latestEntry: any;              // The latest entry data fetched from the store
 *   isLoading: boolean;            // Indicates if any of the data fetching processes are still loading
 *   hasError: boolean;             // Indicates if there is any error or missing required user data
 * }}
 */

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
