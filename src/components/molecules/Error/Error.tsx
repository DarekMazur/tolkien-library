import { Typography } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';

const Error = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <Wrapper>
      <Typography variant="h3">Something went wrong...</Typography>
      <Typography>{errorMessage ?? 'Please try again'}</Typography>
    </Wrapper>
  );
};

export default Error;
