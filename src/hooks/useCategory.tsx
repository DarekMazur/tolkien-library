import { useEffect, useState } from 'react';
import { ICategoryProps } from '@/lib/types.ts';
import { getCategoryBySlug } from '@/lib/getDataFromApi.ts';

export const useCategory = (slug: string) => {
  const [category, setCategory] = useState<ICategoryProps | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getCategoryBySlug(slug);
        setIsError(res.isError);
        setErrorMessage(res.errorMessage);
        setCategory(res.data);
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

  return { category, isLoading, isError, errorMessage };
};
