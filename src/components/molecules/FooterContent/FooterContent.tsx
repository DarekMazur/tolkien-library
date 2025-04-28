import { Link, Typography } from '@mui/material';
import { copyrightStyles, devStyles, linkStyles } from './FooterContent.styles.ts';

const FooterContent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Typography sx={copyrightStyles}>Tolkienarium &copy; {currentYear}</Typography>
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
