import Header from '@/components/organisms/Header/Header.tsx';
import Footer from '@/components/organisms/Footer/Footer.tsx';
import { useState } from 'react';
import MainMenu from '@/components/organisms/MainMenu/MainMenu.tsx';
import AppProviders from '@/lib/providers/AppProviders.tsx';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <AppProviders>
      <Header toggleMenu={toggleMenu} />
      <MainMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Dolor Sit Amet</p>
      <Footer />
    </AppProviders>
  );
};

export default App;
