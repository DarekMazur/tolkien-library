import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { Box, Typography } from '@mui/material';
import bilbo from '@/assets/images/bilbo-martinfreeman.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/../store';
import { useIdentity } from '@/hooks/useIdentity.tsx';
import { useEffect } from 'react';
import { modifyIdentity } from '@/../store/reducers/identityReducer.ts';
import { sendMessage } from '@/lib/helpers/sendMessage.ts';
import ContactButtons from '@/components/molecules/ContactButtons/ContactButtons.tsx';

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
        <ContactButtons email={pageIdentity ? sendMessage(pageIdentity.adminContact.value) : ''} />
        <img src={bilbo} alt="Bilbo Baggins reading contract" />
      </Box>
    </Wrapper>
  );
};

export default ContactPage;
