import quoteIcon from '@/assets/vector/quote.svg?url';

export const articleCardContentStyles = {
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
};

export const articleCardHeaderTitleStyles = {
  fontFamily: '"Montserrat Variable", sans-serif',
  fontSize: '1.2rem',
  fontWeight: 700,
};

export const articleCardHeaderContentStyles = {
  display: 'flex',
  gap: '1rem',
};
