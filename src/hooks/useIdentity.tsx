import { useEffect, useState } from 'react';
import { IIdentityProps } from '@/lib/types.ts';

export const useIdentity = () => {
  const [identity, setIdentity] = useState<IIdentityProps | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/identity`);
        if (!res.ok) {
          return;
        }
        const identity = await res.json();
        setIdentity(identity.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return { identity };
};
