import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { Box, Button, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CottageIcon from '@mui/icons-material/Cottage';
import bilbo from '../../../assets/images/bilbo-martinfreeman.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useIdentity } from '@/hooks/useIdentity.tsx';
import { useEffect } from 'react';
import { modifyIdentity } from '../../../../store/reducers/identityReducer.ts';
import { sendMessage } from '@/lib/helpers/sendMessage.ts';

const ContactPage = () => {
  const pageIdentity = useSelector((state: RootState) => state.identity);
  const { identity } = useIdentity();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pageIdentity) {
      if (identity) {
        dispatch(modifyIdentity(identity));
      }
    }
  }, [pageIdentity, identity]);

  return (
    <Wrapper>
      <Typography variant="h2">Contact</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<EmailIcon />}
            href={pageIdentity ? sendMessage(pageIdentity.adminContact.value) : ''}
          >
            Send me a message
          </Button>
          <Button
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<CottageIcon />}
          >
            Shire
          </Button>
        </Stack>
        <img src={bilbo} alt="Bilbo Baggins reading contract" />
      </Box>
    </Wrapper>
  );
};

export default ContactPage;
