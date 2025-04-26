import { createTheme } from '@mui/material';
import Tolkien from '../assets/fonts/Tolkien.ttf';
import '@fontsource-variable/montserrat';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: '"Montserrat Variable", sans-serif;',
    fontSize: 16,
    h1: {
      fontFamily: '"Tolkien", sans-serif;',
      fontSize: '3rem',
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
    bat: {
      fontFamily: '"Tolkien", sans-serif;',
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
