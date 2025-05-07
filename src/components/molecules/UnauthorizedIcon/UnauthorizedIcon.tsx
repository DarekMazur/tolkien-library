import { theme } from '@/lib/theme.tsx';
import AnimatedFlames from '@/components/atoms/AnimatedFlames/AnimatedFlames.tsx';
import gandalf from '@/assets/images/ysnp.jpeg';
import { Box } from '@mui/material';

export const UnauthorizedIcon = () => {
  return (
    <Box sx={{ position: 'relative', backgroundColor: theme.palette.primary.main }}>
      <AnimatedFlames />
      <img
        src={gandalf}
        alt="You Shall Not Pass"
        style={{
          zIndex: 5,
          position: 'relative',
          maxWidth: '350px',
          maxHeight: '350px',
          borderRadius: '0.5rem',
        }}
      />
    </Box>
  );
};

export default UnauthorizedIcon;
