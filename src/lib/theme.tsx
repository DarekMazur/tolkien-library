import { createTheme } from '@mui/material';
import Tolkien from '@/assets/fonts/Tolkien.ttf';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import '@fontsource-variable/montserrat';

export const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFF3',
      paper: '#FFFFF3',
    },
    text: {
      primary: '#1D263B',
      secondary: '#1D263B',
    },
    primary: {
      main: '#1D263B',
      light: '#C2D8FF',
      dark: '#384A73',
      contrastText: '#960200',
    },
    secondary: {
      main: '#FFFFF3',
      light: '#7796CB',
    },
  },
  typography: {
    fontFamily: '"Montserrat Variable", sans-serif;',
    fontSize: 16,
    h1: {
      fontFamily: '"Tolkien", sans-serif;',
      fontSize: '60px',
      lineHeight: '1.5',
      textAlign: 'center',
    },
    h2: {
      fontFamily: '"Tolkien", sans-serif;',
      lineHeight: '1.5',
    },
    h3: {
      fontFamily: '"Tolkien", sans-serif;',
      fontSize: '1.5rem',
      lineHeight: '1.5',
    },
    h4: {
      fontFamily: '"Tolkien", sans-serif;',
      lineHeight: '1.5',
    },
    h5: {
      fontFamily: '"Tolkien", sans-serif;',
      lineHeight: '1.5',
    },
    h6: {
      fontFamily: '"Tolkien", sans-serif;',
      lineHeight: '1.5',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Tolkien';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Tolkien'), local('Tolkien'), url(${Tolkien}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});
