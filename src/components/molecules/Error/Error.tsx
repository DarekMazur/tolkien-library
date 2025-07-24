import { Button, Typography } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useNavigate } from 'react-router';

const Error = ({ errorMessage }: { errorMessage?: string }) => {
  const navigate = useNavigate();

  return (
    <Wrapper sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Typography variant="h3">Something went wrong...</Typography>
      <Typography>{errorMessage ?? 'Please try again'}</Typography>
      <Button variant="outlined" onClick={() => navigate('/')}>
        Go home
      </Button>
    </Wrapper>
  );
};

export default Error;
