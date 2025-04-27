import { Link, Typography } from '@mui/material';
import { theme } from '../../../lib/theme.tsx';

const devStyles = {
  width: '85%',
  margin: '0 auto',
  textAlign: 'right',
};

const linkStyles = {
  color: theme.palette.text.secondary,
  fontWeight: 800,
};

const FooterContent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Typography>Tolkienarium &copy; {currentYear}</Typography>
      <Typography fontSize="small" sx={devStyles}>
        Proudly created by{' '}
        <Link href="https://nerdistry.pl" target="_blank" sx={linkStyles}>
          Nerdistry
        </Link>
      </Typography>
    </>
  );
};

export default FooterContent;
