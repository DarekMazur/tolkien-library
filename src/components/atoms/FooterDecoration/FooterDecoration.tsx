import Leaves from '../../../assets/vector/leaves.svg?react';
import { Box } from '@mui/material';

type TFooterDecorationProps = { side?: 'left' | 'right' };

const FooterDecoration = ({ side }: TFooterDecorationProps) => {
  const decorationStyles = {
    position: 'absolute',
    maxHeight: '220px',
    transformOrigin: 'center',
    left: !side || side === 'left' ? '-2.5rem' : 'unset',
    right: side && side === 'right' ? '-2.5rem' : 'unset',
    top: 0,
    transform: !side || side === 'left' ? 'scaleX(-1) rotate(30deg)' : 'rotate(30deg)',
    zIndex: -1,
  };

  return (
    <Box sx={decorationStyles}>
      <Leaves height={'220px'} />
    </Box>
  );
};

export default FooterDecoration;
