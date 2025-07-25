import { Alert, Button, Stack, Typography, AlertTitle } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useNavigate } from 'react-router';

export interface ErrorProps {
  errorMessage?: string;
  errorCode?: number | string;
  resetButtonText?: string;
  onReset?: () => void;
}

const Error = ({ errorMessage, errorCode, resetButtonText = 'Go home', onReset }: ErrorProps) => {
  const navigate = useNavigate();

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <Wrapper>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3" component="h3" tabIndex={-1}>
          Something went wrong...
        </Typography>
        <Alert severity="error">
          <AlertTitle color="error">{errorMessage ?? 'Please try again'}</AlertTitle>
          {errorCode && <Typography variant="subtitle1">{`Code: ${errorCode}`}</Typography>}
        </Alert>
        <Button aria-label="Go back home" variant="outlined" onClick={handleReset}>
          {resetButtonText}
        </Button>
      </Stack>
    </Wrapper>
  );
};

export default Error;
