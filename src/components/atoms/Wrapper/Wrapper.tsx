import { Paper, PaperProps } from '@mui/material';
import { theme } from '@/lib/theme.tsx';
import { SxProps, Theme } from '@mui/system';

interface IWrapperProps {
  children: React.ReactNode;
  isCenter?: boolean;
  isDark?: boolean;
  margin?: number | string;
  isTransparent?: boolean;
  sx?: SxProps<Theme>;
}

type TWrapperProps = IWrapperProps & Omit<PaperProps, keyof IWrapperProps>;

const wrapperStyles = {
  p: '2rem',
  display: 'flex',
  flexDirection: 'column',
};

const Wrapper = ({ children, isCenter, isDark, margin, isTransparent, sx }: TWrapperProps) => {
  const getMinHeight = (): string => {
    if (margin === 0 || margin === undefined) return '100vh';
    const marginValue = typeof margin === 'number' ? `${2 * margin}px` : `calc(2 * ${margin})`;
    return `calc(100vh - ${marginValue})`;
  };

  const getBackgroundColor = (): string => {
    if (isTransparent) return 'transparent';
    return isDark ? theme.palette.primary.main : 'default';
  };

  return (
    <Paper
      component="main"
      elevation={2}
      sx={[
        wrapperStyles,
        {
          m: margin ?? '2rem',
          alignItems: isCenter ? 'center' : 'stretch',
          justifyContent: isCenter ? 'center' : 'normal',
          backgroundColor: getBackgroundColor(),
          minHeight: getMinHeight(),
          color: isDark ? theme.palette.secondary.main : 'black',
        },
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
    >
      {children}
    </Paper>
  );
};

export default Wrapper;
