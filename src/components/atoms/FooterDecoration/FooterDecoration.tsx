import Leaves from '../../../assets/vector/leaves.svg?react';

type FooterDecorationProps = { side?: 'left' | 'right' };

const FooterDecoration = ({ side }: FooterDecorationProps) => {
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

  return <Leaves style={decorationStyles} />;
};

export default FooterDecoration;
