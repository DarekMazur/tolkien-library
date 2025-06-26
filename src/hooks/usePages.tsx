import { useEffect, useState } from 'react';
import { IPageProps } from '@/lib/types.ts';

export const usePages = (slug: string) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<IPageProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pages/${slug}`);
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        setPage(data);
      } catch (err) {
        console.error(err);
        setIsError(true);
        setErrorMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug]);

  return { page, isError, isLoading, errorMessage };
};
