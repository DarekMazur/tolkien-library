import { useState, useEffect } from 'react';
import { IPageProps } from '@/lib/types.ts';

export const usePages = (slug: string) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<IPageProps | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      return await fetch(`${import.meta.env.VITE_API_URL}/pages/${slug}`).then((res) => {
        if (res.status !== 200) {
          setIsLoading(false);
          setIsError(true);
          throw new Error(res.statusText);
        }
        return res.json();
      });
    };

    fetchPage().then((data) => {
      setIsLoading(false);
      setPage(data);
    });
  }, []);

  return { page, isError, isLoading };
};
