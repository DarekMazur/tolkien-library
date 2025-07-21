import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useApi } from '@/hooks/useApi.tsx';
import { getTranslatorBySlug } from '@/lib/getDataFromApi.ts';
import Loader from '@/components/atoms/Loader/Loader.tsx';

const TranslatorPage = () => {
  const { slug } = useParams();
  const { data, isError, isLoading } = useApi(() => getTranslatorBySlug(slug!));

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <Wrapper>
      {!isError && data ? (
        <>
          <Typography variant="h2">Translator</Typography>
          <Typography variant="h3">{`${data.firstName} ${data.lastName}`}</Typography>
          <Box pb={2}>{data.description}</Box>
        </>
      ) : null}
    </Wrapper>
  );
};

export default TranslatorPage;
