import { theme } from '@/lib/theme.tsx';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';

interface IAppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          {children}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default AppProviders;
