import Backdrop from '@mui/material/Backdrop';
import { theme } from '@/lib/theme.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';

interface ILoaderProps {
  isLoading: boolean;
  isCenter?: boolean;
  isDark?: boolean;
  margin?: number;
  isTransparent?: boolean;
}

const Loader = ({ isLoading, isCenter, isDark, margin, isTransparent }: ILoaderProps) => {
  return (
    <Wrapper isCenter={isCenter} isDark={isDark} margin={margin} isTransparent={isTransparent}>
      <Backdrop
        aria-label="Loader"
        sx={{ color: theme.palette.primary.main, zIndex: 999 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" size={100} />
      </Backdrop>
    </Wrapper>
  );
};

export default Loader;
