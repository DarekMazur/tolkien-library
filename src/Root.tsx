import Header from '@/components/organisms/Header/Header.tsx';
import Footer from '@/components/organisms/Footer/Footer.tsx';
import { useState } from 'react';
import MainMenu from '@/components/organisms/MainMenu/MainMenu.tsx';
import AppProviders from '@/lib/providers/AppProviders.tsx';
import Home from '@/components/pages/Home/Home.tsx';
import { Route, Routes } from 'react-router';

const Root = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <AppProviders>
      <Header toggleMenu={toggleMenu} />
      <MainMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </AppProviders>
  );
};

export default Root;
