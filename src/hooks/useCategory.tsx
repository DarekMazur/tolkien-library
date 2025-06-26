import { useEffect, useState } from 'react';

export const useCategory = (slug: string) => {
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${slug}`);
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        setCategory(data);
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
