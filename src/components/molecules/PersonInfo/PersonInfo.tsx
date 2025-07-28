import { Box, Divider, Typography } from '@mui/material';

interface PersonInfoProps {
  fullName: string;
  roleLabel: string;
  description?: string;
}

const PersonInfo = ({ fullName, roleLabel, description }: PersonInfoProps) => (
  <Box>
    <Typography variant="h2" component="h1">
      {fullName}
    </Typography>

    <Typography variant="h3" component="h2" color="text.secondary">
      {roleLabel}
    </Typography>

    {description && (
      <>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body1">{description}</Typography>
      </>
    )}
  </Box>
);

export default PersonInfo;
