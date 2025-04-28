import Header from './components/organisms/Header/Header.tsx';
import { theme } from './lib/theme.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Footer from './components/organisms/Footer/Footer.tsx';
import { useState } from 'react';
import MainMenu from './components/organisms/MainMenu/MainMenu.tsx';
import { Provider } from 'react-redux';
import { store } from '../store';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Header toggleMenu={toggleMenu} />
        <MainMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p>Dolor Sit Amet</p>
        <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
