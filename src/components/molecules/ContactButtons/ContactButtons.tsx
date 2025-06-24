import { Button, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CottageIcon from '@mui/icons-material/Cottage';

const ContactButtons = ({ email }: { email: string }) => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        mt: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Button
        component="a"
        role="button"
        variant="text"
        tabIndex={-1}
        startIcon={<EmailIcon />}
        href={email}
      >
        Send me a message
      </Button>
      <Button
        component="label"
        role="button"
        variant="text"
        tabIndex={-1}
        startIcon={<CottageIcon />}
      >
        Shire
      </Button>
    </Stack>
  );
};

export default ContactButtons;
