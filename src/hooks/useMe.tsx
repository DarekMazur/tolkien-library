import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail } from '@/lib/getDataFromApi.ts';
import { useEffect, useState } from 'react';
import { IRegisteredUser, IUser } from '@/lib/types.ts';
import { useAddUserMutation } from '../../store';

export const useMe = () => {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth0();
  const [addUser] = useAddUserMutation();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(authLoading);

  useEffect(() => {
    if (authUser) {
      getUserByEmail(authUser.email as string).then((res) => {
        if (isAuthenticated) {
          if (res === 'User not found') {
            const newUser: IRegisteredUser = {
              avatar: authUser.picture as string,
              email: authUser.email as string,
              emailVerified: authUser.email_verified as boolean,
              userName: authUser.nickname as string,
            };

            addUser(newUser).then((res) => {
              if (res.data) {
                setUser(res.data);
              }
            });
          } else {
            setUser(res.data);
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
