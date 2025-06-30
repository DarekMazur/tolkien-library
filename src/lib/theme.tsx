import { createTheme } from '@mui/material';
import Tolkien from '@/assets/fonts/Tolkien.ttf';
import '@fontsource-variable/montserrat/index.css';

const colors = {
  light: '#FFFFF3',
  lightBlue: '#C2D8FF',
  blue: '#384A73',
  darkBlue: '#1D263B',
  greyBlue: '#7796CB',
  green: '#1F4C0A',
  red: '#960200',
};

export const theme = createTheme({
  palette: {
    background: {
      default: colors.light,
      paper: colors.light,
    },
    text: {
      primary: colors.darkBlue,
      secondary: colors.darkBlue,
    },
    primary: {
      main: colors.darkBlue,
      light: colors.lightBlue,
      dark: colors.blue,
      contrastText: colors.red,
    },
    secondary: {
      main: colors.light,
      light: colors.greyBlue,
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
