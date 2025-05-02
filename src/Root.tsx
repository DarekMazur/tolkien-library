import { useState } from 'react';
import AppProviders from '@/lib/providers/AppProviders.tsx';
import Home from '@/components/pages/Home/Home.tsx';
import { Route, Routes } from 'react-router';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import EmptyLayout from '@/layouts/EmptyLayout.tsx';

const Root = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <AppProviders>
      <Routes>
        <Route element={<DefaultLayout toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<EmptyLayout />}>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </AppProviders>
  );
};

export default Root;
