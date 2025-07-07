import { useEffect, useState } from 'react';
import { TResponse } from '@/lib/types';

export const useApi = <T,>(fn: () => Promise<TResponse<T>>) => {
  const [data, setData] = useState<T | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fn();
        setIsError(res.isError);
        setErrorMessage(res.errorMessage);
        setData(res.data);
      } catch (err) {
        setErrorMessage(err instanceof Error ? `Error: ${err.message}` : 'Error: unknown error');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isError, isLoading, errorMessage };
};
