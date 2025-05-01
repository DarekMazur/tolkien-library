import Header from '@/components/organisms/Header/Header.tsx';
import Footer from '@/components/organisms/Footer/Footer.tsx';
import { useState } from 'react';
import MainMenu from '@/components/organisms/MainMenu/MainMenu.tsx';
import AppProviders from '@/lib/providers/AppProviders.tsx';
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { faker } from '@faker-js/faker';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { displayDate, generateMockNews } from '@/lib/mockArticles.ts';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <AppProviders>
      <Header toggleMenu={toggleMenu} />
      <MainMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Wrapper>
        {generateMockNews(6).map((item) => (
          <Card key={item.id}>
            <CardHeader title={displayDate(item.date)} subheader={item.category || null} />
            <Divider />
            <CardContent>
              <Typography variant="body2" component="article" sx={{ color: 'text.secondary' }}>
                <Alert severity="info" sx={{ mb: '2rem' }}>
                  <AlertTitle>{faker.lorem.word()}</AlertTitle>
                  {faker.lorem.paragraph({ min: 10, max: 20 })}
                </Alert>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown>
                <Alert severity="warning" sx={{ mb: '2rem' }}>
                  <AlertTitle>{faker.lorem.word()}</AlertTitle>
                  {faker.lorem.paragraph({ min: 10, max: 20 })}
                </Alert>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Wrapper>
      <Footer />
    </AppProviders>
  );
};

export default App;
