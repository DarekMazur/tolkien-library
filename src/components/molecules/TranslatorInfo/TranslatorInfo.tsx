import { ITranslatorProps } from '@/lib/types';
import { Box, Divider, Typography } from '@mui/material';

/**
 * TranslatorInfo
 *
 * Renders information about a translator, including their full name,
 * role label, and an optional descriptive section.
 *
 * @param {Object} props - Component props.
 * @param {ITranslatorProps} props.translator - Translator data.
 * @param {string} props.translator.firstName - Translator’s first name.
 * @param {string} props.translator.lastName - Translator’s last name.
 * @param {string} [props.translator.description] - Optional biography or description of the translator.
 *
 * @returns {JSX.Element} A layout displaying the translator’s full name, a "Translator" subtitle,
 * and, if provided, a descriptive paragraph separated by a divider.
 *
 * @example
 * const translator = {
 *   firstName: 'Jane',
 *   lastName: 'Doe',
 *   description: 'Jane has been translating literature for over 10 years…'
 * };
 *
 * <TranslatorInfo translator={translator} />
 */

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
