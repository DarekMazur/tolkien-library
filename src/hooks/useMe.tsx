import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail } from '@/lib/getDataFromApi.ts';
import { useEffect, useState } from 'react';
import { IUser } from '@/lib/types.ts';

export const useMe = () => {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth0();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(authLoading);

  useEffect(() => {
    if (authUser) {
      getUserByEmail(authUser.email as string).then((data) => {
        if (isAuthenticated) {
          if (data === 'User not found') {
            const newUser = {
              id: authUser.sub as string,
              avatar: authUser.picture as string,
              email: authUser.email as string,
              emailVerified: authUser.email_verified as boolean,
              isBanned: false,
              userName: authUser.nickname as string,
              role: {
                id: '2',
                roleName: 'User',
                roleShorthand: 'user',
              },
            };
            setUser(newUser);
          } else {
            setUser(data.data);
          }
        }
      });
    }
  }, [authUser]);

  useEffect(() => {
    setIsLoading(authLoading);
  }, [authLoading]);

  return { user, isLoading };
};
