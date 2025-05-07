import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return { isAuthenticated, isLoading };
}
