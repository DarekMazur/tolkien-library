import { useEffect, useState } from 'react';

export const useIdentity = () => {
  const [identity, setIdentity] = useState();

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
          console.log(res.data);
          return res.data;
        });
    };

    fetchIdentity().then((data) => {
      setIdentity(data);
    });
  }, []);

  return { identity };
};
