import { useEffect, useState } from 'react';
import { ICategoryProps } from '@/lib/types.ts';

export const useCategory = (slug: string) => {
  const [category, setCategory] = useState<ICategoryProps | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        const category = data.filter((cat: ICategoryProps) => cat.slug === slug);
        setCategory(category[0]);
      } catch (err) {
        console.error(err);
        setIsError(true);
        setErrorMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug]);

  return { category, isLoading, isError, errorMessage };
};
