import { createContext, useContext } from 'react';

const Auth0Context = createContext({
  isAuthenticated: false,
  isLoading: false,
  loginWithRedirect: () => {},
  logout: () => {},
});

export const Auth0Provider = ({ value, children }) => (
  <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>
);

export const useAuth0 = () => useContext(Auth0Context);
