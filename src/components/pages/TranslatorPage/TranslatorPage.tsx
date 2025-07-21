import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { Box } from '@mui/material';
import { useParams } from 'react-router';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import { useTranslatorData } from '@/hooks/useTranslatorData.ts';
import TranslatorInfo from '@/components/molecules/TranslatorInfo/TranslatorInfo.tsx';
import TranslatedBooksList from '@/components/molecules/TranslatedBooksList/TranslatedBooksList.tsx';

const TranslatorPage = () => {
  const { slug } = useParams();
  const { translator, books, isLoading, hasError, errorMessage } = useTranslatorData(slug);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (hasError || !translator) {
    return (
      <Wrapper>
        <Box>{errorMessage || 'Translator not found'}</Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TranslatorInfo translator={translator} />
      <TranslatedBooksList books={books} />
    </Wrapper>
  );
};

export default TranslatorPage;
