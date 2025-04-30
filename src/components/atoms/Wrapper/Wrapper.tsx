import { Paper } from '@mui/material';

interface IWrapperProps {
  children: React.ReactNode;
}

const wrapperStyles = {
  mx: '2rem',
  p: '2rem',
};

const Wrapper = ({ children }: IWrapperProps) => {
  return (
    <Paper component="main" elevation={2} sx={wrapperStyles}>
      {children}
    </Paper>
  );
};

export default Wrapper;
