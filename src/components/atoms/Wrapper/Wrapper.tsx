import { Paper } from '@mui/material';
import { theme } from '@/lib/theme.tsx';

interface IWrapperProps {
  children: React.ReactNode;
  isCenter?: boolean;
  isDark?: boolean;
  margin?: number;
}

const wrapperStyles = {
  p: '2rem',
  display: 'flex',
  flexDirection: 'column',
};

const Wrapper = ({ children, isCenter, isDark, margin }: IWrapperProps) => {
  return (
    <Paper
      component="main"
      elevation={2}
      sx={{
        ...wrapperStyles,
        m: margin !== undefined ? margin : '2rem',
        alignItems: isCenter ? 'center' : 'stretch',
        justifyContent: isCenter ? 'center' : 'normal',
        backgroundColor: isDark ? theme.palette.primary.main : 'default',
        minHeight: `calc(${margin !== undefined ? (margin === 0 ? '100vh' : `100vh - {2 * margin}`) : '100vh - 4rem'})`,
      }}
    >
      {children}
    </Paper>
  );
};

export default Wrapper;
