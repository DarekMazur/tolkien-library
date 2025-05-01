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
import quoteIcon from '@/assets/vector/quote.svg?url';

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
          <Card key={item.id} elevation={0} sx={{ my: '2rem' }}>
            <CardHeader
              slotProps={{
                title: {
                  style: {
                    fontFamily: '"Montserrat Variable", sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                  },
                },
                content: {
                  style: {
                    display: 'flex',
                    gap: '1rem',
                  },
                },
              }}
              title={displayDate(item.date)}
              subheader={item.category || null}
            />
            <Divider />
            <CardContent
              sx={{
                '& blockquote': {
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'lightGrey',
                  color: 'darkBlue',
                  margin: '1rem 0',
                  fontStyle: 'italic',
                  minHeight: 48,
                  pl: '5rem',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 48,
                    height: '100%',
                    backgroundColor: 'grey',
                    backgroundImage: `url("${quoteIcon}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 24,
                  },
                },
                '& table': {
                  m: '2rem auto',
                  borderSpacing: 0,
                  border: '0.5px solid black',
                  '& th': { backgroundColor: 'lightGrey' },
                  '& td, & th': {
                    border: '0.5px solid black',
                    p: '1rem 2rem',
                    textAlign: 'center',
                  },
                },
              }}
            >
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
