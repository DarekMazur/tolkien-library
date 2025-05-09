import { theme } from '@/lib/theme.tsx';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react'
import { store } from '../../../store';
import { CssBaseline, ThemeProvider } from '@mui/material';

interface IAppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid profile email'
      }}
      cacheLocation="localstorage"
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          {children}
        </Provider>
      </ThemeProvider>
    </Auth0Provider>
  );
};

export default AppProviders;
