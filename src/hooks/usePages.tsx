import { useEffect, useState } from 'react';
import { IPageProps } from '@/lib/types.ts';
import { getPageBySlug } from '@/lib/getDataFromApi.ts';

export const usePages = (slug: string) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<IPageProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getPageBySlug(slug);
        setIsError(res.isError);
        setErrorMessage(res.errorMessage);
        setPage(res.data);
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
  }, [slug]);

  return { page, isError, isLoading, errorMessage };
};
