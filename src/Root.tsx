import { useState } from 'react';
import AppProviders from '@/lib/providers/AppProviders.tsx';
import Home from '@/components/pages/Home/Home.tsx';
import { Route, Routes, Outlet, Navigate } from 'react-router';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import EmptyLayout from '@/layouts/EmptyLayout.tsx';
import PageNotFound from '@/components/pages/404/404.tsx';
import LoginPage from '@/components/pages/LoginPage/LoginPage.tsx';
import UnauthorizedView from '@/components/pages/UnauthorizedView/UnauthorizedView.tsx';
import { useAuth } from '@/hooks/useAuth.tsx';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { theme } from '@/lib/theme.tsx';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Wrapper isCenter>
        <Backdrop sx={{ color: theme.palette.primary.main, zIndex: 999 }} open>
          <CircularProgress color="inherit" size={100} />
        </Backdrop>
      </Wrapper>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/unauthorized" />;
};

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
          <Route path="/board" element={<ProtectedRoute />}>
            <Route index element={<div>Board</div>} />
          </Route>
        </Route>
        <Route element={<EmptyLayout />}>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedView />} />
        </Route>
      </Routes>
    </AppProviders>
  );
};

export default Root;
