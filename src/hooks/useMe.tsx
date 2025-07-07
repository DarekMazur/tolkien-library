import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { IUser } from '@/lib/types';

export const useMe = () => {
  const { user: authUser, isLoading: authLoading, isAuthenticated: isAuth0 } = useAuth0();

  const [user, setUser] = useState<IUser | null>(null);

  const isLoading = authLoading || (isAuth0 && user === null);
  const isAuthenticated = isAuth0;

  useEffect(() => {
    if (!isAuthenticated || !authUser) {
      setUser(null);
      return;
    }

    (async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          method: 'POST',
          body: JSON.stringify({
            email: authUser.email,
            userName: authUser.nickname,
            emailVerified: isAuth0,
            avatar: authUser.picture,
          }),
        });

        if (response.status !== 200) {
          throw new Error(response.statusText || 'Fetch error');
        }

        const { data } = await response.json();
        setUser(data);
      } catch (err: unknown) {
        console.error('[useMe] fetch error:', err);
        setUser(null);
      }
    })();
  }, [isAuthenticated, authUser, isAuth0]);

  return { user, isLoading, isAuthenticated };
};
