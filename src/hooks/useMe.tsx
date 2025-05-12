import { useAuth0 } from '@auth0/auth0-react';
import { getLogin } from '@/lib/getDataFromApi.ts';
import { useEffect, useState } from 'react';
import { IRegisteredUser, IUser } from '@/lib/types.ts';

export const useMe = () => {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth0();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(authLoading);

  useEffect(() => {
    if (authUser) {
      if (isAuthenticated) {
        const authenticatedUser: IRegisteredUser = {
          avatar: authUser.picture as string,
          email: authUser.email as string,
          emailVerified: authUser.email_verified as boolean,
          userName: authUser.nickname as string,
        };
        getLogin(authenticatedUser).then(({ data }: { data: IUser }) => {
          setUser(data);
        });
      }
    }
  }, [authUser]);

  useEffect(() => {
    setIsLoading(authLoading);
  }, [authLoading]);

  return { user, isLoading };
};
