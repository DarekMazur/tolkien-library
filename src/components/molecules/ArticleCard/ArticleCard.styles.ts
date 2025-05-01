import quoteIcon from '@/assets/vector/quote.svg?url';
import { theme } from '@/lib/theme.tsx';

export const articleCardContentStyles = {
  '& a': {
    color: theme.palette.primary.contrastText,
    fontWeight: '500',
    textDecoration: 'none',
  },
  '& blockquote': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
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
      backgroundColor: theme.palette.secondary.light,
      backgroundImage: `url("${quoteIcon}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 18,
    },
  },
  '& table': {
    m: '2rem auto',
    borderSpacing: 0,
    border: '0.5px solid black',
    '& th': { backgroundColor: theme.palette.primary.light },
    '& td, & th': {
      border: '0.5px solid black',
      p: '1rem 2rem',
      textAlign: 'center',
    },
  },
};

export const articleCardHeaderTitleStyles = {
  fontFamily: '"Montserrat Variable", sans-serif',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: theme.palette.primary.dark,
};

export const articleCardHeaderSubtitleStyles = {
  fontWeight: 700,
  color: theme.palette.primary.dark,
};

export const articleCardHeaderContentStyles = {
  display: 'flex',
  gap: '1rem',
};
