import { useEffect, useState } from 'react';
import { IIdentityProps } from '@/lib/types.ts';
import { getPageIdentity } from '@/lib/getDataFromApi.ts';

export const useIdentity = () => {
  const [identity, setIdentity] = useState<IIdentityProps | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getPageIdentity();
        setIsError(res.isError);
        setErrorMessage(res.errorMessage);
        setIdentity(res.data);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(`Error: ${err.message}`);
        } else {
          setErrorMessage('Error: unknown error');
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { identity, isError, isLoading, errorMessage };
};
