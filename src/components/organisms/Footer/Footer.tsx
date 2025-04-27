import { Box, Typography, Link } from '@mui/material';
import Leaves from '../../../assets/vector/leaves.svg?react';
import { theme } from '../../../lib/theme.tsx';

type FooterDecorationProps = { side?: 'left' | 'right' };

const FooterDecoration = ({ side }: FooterDecorationProps) => {
  return (
    <Leaves
      style={{
        position: 'absolute',
        maxHeight: '220px',
        transformOrigin: 'center',
        left: !side || side === 'left' ? '-2.5rem' : 'unset',
        right: side && side === 'right' ? '-2.5rem' : 'unset',
        top: 0,
        transform: !side || side === 'left' ? 'scaleX(-1) rotate(30deg)' : 'rotate(30deg)',
      }}
    />
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        height: '174px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <FooterDecoration />
      <Typography>Tolkienarium &copy; {currentYear}</Typography>
      <Typography fontSize="small" sx={{ width: '85%', margin: '0 auto', textAlign: 'right' }}>
        Proudly created by{' '}
        <Link
          href="https://nerdistry.pl"
          target="_blank"
          sx={{ color: theme.palette.text.secondary, fontWeight: 800 }}
        >
          Nerdistry
        </Link>
      </Typography>
      <FooterDecoration side="right" />
    </Box>
  );
};

export default Footer;
