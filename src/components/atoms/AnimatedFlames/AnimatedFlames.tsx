import Flames from '@/assets/vector/flames.svg?react';
import { FireWrapper } from '@/components/atoms/AnimatedFlames/AnimatedFlames.styles.ts';

const AnimatedFlames = () => {
  return (
    <FireWrapper className="mo-fire">
      <Flames role="img" aria-hidden="true" />
    </FireWrapper>
  );
};

export default AnimatedFlames;
