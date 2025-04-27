import { Box } from '@mui/material';
import FooterDecoration from '../../atoms/FooterDecoration/FooterDecoration.tsx';
import FooterContent from '../../molecules/FooterContent/FooterContent.tsx';

const footerStyles = {
  position: 'relative',
  height: '174px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  mt: '-4rem',
};

const Footer = () => {
  return (
    <Box component="footer" sx={footerStyles}>
      <FooterDecoration />
      <FooterContent />
      <FooterDecoration side="right" />
    </Box>
  );
};

export default Footer;
