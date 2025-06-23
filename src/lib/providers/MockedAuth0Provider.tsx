import { createContext, ReactNode, useContext } from 'react';

interface Auth0User {
  name?: string;
  email?: string;
  picture?: string;
  email_verified?: boolean;
  sub?: string;
  [key: string]: unknown;
}

interface Auth0ContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: Auth0User | null;
  loginWithRedirect: () => void;
  logout: () => void;
  getAccessTokenSilently: () => Promise<string>;
  getIdTokenClaims: () => Promise<unknown>;
  getAccessTokenWithPopup: () => Promise<string>;
  loginWithPopup: () => Promise<void>;
}

const defaultContext: Auth0ContextType = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  loginWithRedirect: () => {},
  logout: () => {},
  getAccessTokenSilently: () => Promise.resolve(''),
  getIdTokenClaims: () => Promise.resolve({}),
  getAccessTokenWithPopup: () => Promise.resolve(''),
  loginWithPopup: () => Promise.resolve(),
};

const Auth0Context = createContext<Auth0ContextType>(defaultContext);

interface Auth0ProviderProps {
  children: ReactNode;
  value?: Partial<Auth0ContextType>;
}

export const Auth0Provider = ({ value, children }: Auth0ProviderProps) => {
  const contextValue = { ...defaultContext, ...value };

  return <Auth0Context.Provider value={contextValue}>{children}</Auth0Context.Provider>;
};

export const useAuth0 = () => useContext(Auth0Context);

export default Auth0Provider;
