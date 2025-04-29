import { Link, Typography } from '@mui/material';
import { copyrightStyles, devStyles, linkStyles } from './FooterContent.styles.ts';

const FooterContent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Typography sx={copyrightStyles}>Tolkienarium &copy; {currentYear}</Typography>
      <Typography fontSize="small" sx={devStyles}>
        Proudly created by{' '}
        <Link
          role="link"
          href="https://nerdistry.pl"
          target="_blank"
          rel="noopener noreferrer"
          sx={linkStyles}
        >
          Nerdistry
        </Link>
      </Typography>
    </>
  );
};

export default FooterContent;
