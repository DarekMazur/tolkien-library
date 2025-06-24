import { useEffect, useState } from 'react';
import { IIdentityProps } from '@/lib/types.ts';

export const useIdentity = () => {
  const [identity, setIdentity] = useState<IIdentityProps | null>(null);

  useEffect(() => {
    const fetchIdentity = async () => {
      return await fetch(`${import.meta.env.VITE_API_URL}/identity`)
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

    fetchIdentity().then((data) => {
      setIdentity(data);
    });
  }, []);

  return { identity };
};
