import Header from './components/Header/Header.tsx';
import { theme } from './lib/theme.tsx';
import { ThemeProvider } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Dolor Sit Amet</p>
    </ThemeProvider>
  );
};

export default App;
