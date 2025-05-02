import { theme } from '@/lib/theme.tsx';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { CssBaseline, ThemeProvider } from '@mui/material';

interface IAppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default AppProviders;
