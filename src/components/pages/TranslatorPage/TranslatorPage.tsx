import Wrapper from '@/components/atoms/Wrapper/Wrapper';
import { Typography } from '@mui/material';
import { useParams } from 'react-router';

const TranslatorPage = () => {
  const { slug } = useParams();

  console.log(slug);

  return (
    <Wrapper>
      <Typography variant="h2">Translator</Typography>
      <Typography variant="h3">John Doe</Typography>
    </Wrapper>
  );
};

export default TranslatorPage;
