import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { Box, Typography } from '@mui/material';
import bilbo from '@/assets/images/bilbo-martinfreeman.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/../store';
import { useEffect } from 'react';
import { modifyIdentity } from '@/../store/reducers/identityReducer';
import { sendMessage } from '@/lib/helpers/sendMessage.ts';
import ContactButtons from '@/components/molecules/ContactButtons/ContactButtons';
import { useApi } from '@/hooks/useApi';
import { getPageIdentity } from '@/lib/getDataFromApi';
import Loader from '@/components/atoms/Loader/Loader';
import Error from '@/components/molecules/Error/Error';

const ContactPage = () => {
  const pageIdentity = useSelector((state: RootState) => state.identity);
  const { data: identity, isLoading, isError, errorMessage } = useApi(() => getPageIdentity());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pageIdentity) {
      if (identity) {
        dispatch(modifyIdentity(identity));
      }
    }
  }, [pageIdentity, identity]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return <Error errorMessage={errorMessage || undefined} />;
  }

  return (
    <Wrapper>
      <>
        <Typography variant="h2">Contact</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <ContactButtons
            email={pageIdentity ? sendMessage(pageIdentity.adminContact.value) : ''}
          />
          <img src={bilbo} alt="Bilbo Baggins reading contract" />
        </Box>
      </>
    </Wrapper>
  );
};

export default ContactPage;
