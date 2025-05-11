import { theme } from '@/lib/theme.tsx';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
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
        audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
        scope: 'openid profile email read:users update:users',
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
