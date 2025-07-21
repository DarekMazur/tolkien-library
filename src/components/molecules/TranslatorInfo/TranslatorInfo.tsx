import { ITranslatorProps } from '@/lib/types';
import { Box, Divider, Typography } from '@mui/material';

const TranslatorInfo = ({ translator }: { translator: ITranslatorProps }) => {
  const fullName = `${translator.firstName} ${translator.lastName}`;

  return (
    <Box>
      <Typography variant="h2" component="h1">
        {fullName}
      </Typography>
      <Typography variant="h3" component="h2" color="text.secondary">
        Translator
      </Typography>
      {translator.description && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {translator.description}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default TranslatorInfo;
