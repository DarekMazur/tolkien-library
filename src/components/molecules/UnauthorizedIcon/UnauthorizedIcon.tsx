import AnimatedFlames from '@/components/atoms/AnimatedFlames/AnimatedFlames.tsx';
import gandalf from '@/assets/images/ysnp.jpeg';
import { Box } from '@mui/material';
import {
  unauthorizedIconStyles,
  unauthorizedIconWrapperStyles,
} from '@/components/molecules/UnauthorizedIcon/UnauthorizedIcon.styles.ts';

export const UnauthorizedIcon = () => {
  return (
    <Box sx={unauthorizedIconWrapperStyles}>
      <AnimatedFlames />
      <img
        src={gandalf}
        alt="You Shall Not Pass"
        style={{ ...unauthorizedIconStyles, position: 'relative' }}
        role="img"
      />
    </Box>
  );
};

export default UnauthorizedIcon;
