import { Outlet } from 'react-router';
import Header from '@/components/organisms/Header/Header.tsx';
import MainMenu from '@/components/organisms/MainMenu/MainMenu.tsx';
import Footer from '@/components/organisms/Footer/Footer.tsx';

interface ILayoutProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export default function DefaultLayout({ toggleMenu, isMenuOpen }: ILayoutProps) {
  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <MainMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Outlet />
      <Footer />
    </>
  );
}
