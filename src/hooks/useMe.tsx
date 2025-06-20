import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { IUser } from '@/lib/types.ts';

export const useMe = () => {
  const { user: authUser, isAuthenticated: isAuth0, isLoading: authLoading } = useAuth0();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(authLoading);
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth0);

  useEffect(() => {
    if (isAuthenticated) {
      if (authUser) {
        const getMyData = async () => {
          const email = authUser.email;
          return await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
            method: 'POST',
            body: JSON.stringify({ email }),
          })
            .then((res) => {
              if (res.status !== 200) {
                throw new Error(res.statusText);
              }
              return res.json();
            })
            .then((res) => {
              return res.data;
            });
        };

        getMyData().then((user) => {
          const { id, avatar, userName, email, emailVerified, isBanned, role } = user;
          const authenticatedUser: IUser = {
            id,
            avatar,
            email,
            emailVerified,
            userName,
            isBanned,
            role,
          };
          setUser(authenticatedUser);
        });
      }
    }
  }, [authUser, isAuthenticated]);

  useEffect(() => {
    setIsAuthenticated(isAuth0);
  }, [isAuth0]);

  useEffect(() => {
    setIsLoading(authLoading);
  }, [authLoading]);

  return { user, isLoading, isAuthenticated };
};
