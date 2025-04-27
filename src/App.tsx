import Header from './components/organisms/Header/Header.tsx';
import { theme } from './lib/theme.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Footer from './components/organisms/Footer/Footer.tsx';
import { useState } from 'react';
import MainMenu from './components/organisms/MainMenu/MainMenu.tsx';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
