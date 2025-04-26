import Header from './components/organisms/Header/Header.tsx';
import { theme } from './lib/theme.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Footer from './components/organisms/Footer/Footer.tsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Dolor Sit Amet</p>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
