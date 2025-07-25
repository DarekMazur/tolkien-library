import { Alert, Button, Stack, Typography, AlertTitle } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useNavigate } from 'react-router';

/**
 * Props for the Error component.
 */
export interface ErrorProps {
  errorMessage?: string;
  errorCode?: number | string;
  resetButtonText?: string;
  onReset?: () => void;
}

/**
 * Error component that displays error information with a reset action.
 *
 * This component renders an error screen with:
 * - A main error title
 * - An alert box containing the error message and optional error code
 * - A button to reset/navigate away from the error state
 *
 * @component
 * @example
 * ```
 * // Basic usage with default message
 * <Error />
 *
 * // With custom message and error code
 * <Error
 *   errorMessage="Failed to load user data"
 *   errorCode={404}
 *   resetButtonText="Try again"
 * />
 *
 * // With custom reset handler
 * <Error
 *   errorMessage="Session expired"
 *   errorCode={401}
 *   onReset={() => signOut()}
 * />
 * ```
 *
 * @param props - The component props
 * @returns JSX.Element representing the error screen
 */
const Error = ({ errorMessage, errorCode, resetButtonText = 'Go home', onReset }: ErrorProps) => {
  const navigate = useNavigate();

  /**
   * Handles the reset button click event.
   * Executes custom onReset callback if provided, otherwise navigates to home page.
   */
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
