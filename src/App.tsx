import Header from '@/components/organisms/Header/Header.tsx';
import Footer from '@/components/organisms/Footer/Footer.tsx';
import { useState } from 'react';
import MainMenu from '@/components/organisms/MainMenu/MainMenu.tsx';
import AppProviders from '@/lib/providers/AppProviders.tsx';
import { Alert, AlertTitle, Box, Paper, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <AppProviders>
      <Header toggleMenu={toggleMenu} />
      <MainMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Paper component="main" elevation={2} sx={{ mx: '2rem', p: '2rem' }}>
        <Box>
          <Alert severity="info" sx={{ mb: '2rem' }}>
            <AlertTitle>{faker.lorem.word()}</AlertTitle>
            {faker.lorem.paragraph({ min: 10, max: 20 })}
          </Alert>
          <Typography sx={{ mb: '2rem' }}>
            {faker.lorem.paragraph({ min: 50, max: 100 })}
          </Typography>
          <Typography sx={{ mb: '2rem' }}>
            {faker.lorem.paragraph({ min: 50, max: 100 })}
          </Typography>
          <Alert severity="info" sx={{ mb: '2rem' }}>
            <AlertTitle>{faker.lorem.word()}</AlertTitle>
            {faker.lorem.paragraph({ min: 10, max: 20 })}
          </Alert>
          <Typography>{faker.lorem.paragraph({ min: 50, max: 100 })}</Typography>
        </Box>
      </Paper>
      <Footer />
    </AppProviders>
  );
};

export default App;
