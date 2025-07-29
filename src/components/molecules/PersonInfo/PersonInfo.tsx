import { Box, Divider, Typography } from '@mui/material';

/**
 * Renders basic personal information such as full name, role label
 * and an optional description block.
 *
 * @component
 * @example
 * ```
 * <PersonInfo
 *   fullName="Éowyn of Rohan"
 *   roleLabel="Shieldmaiden"
 *   description="I am no man!"
 * />
 * ```
 *
 * @param {PersonInfoProps} props
 * @param {string} props.fullName - Person’s full display name.
 * @param {string} props.roleLabel - Short role or title to show under the name.
 * @param {string} [props.description] - Optional longer description or biography.
 *
 * @returns {JSX.Element} Read-only React element that displays person details.
 */
interface PersonInfoProps {
  fullName: string;
  roleLabel: string;
  description?: string;
}

/**
 * Functional component that displays a name, role label
 * and (optionally) a descriptive paragraph separated by a divider.
 */
const PersonInfo = ({ fullName, roleLabel, description }: PersonInfoProps) => (
  <Box>
    <Typography role="heading" variant="h2" component="h1">
      {fullName}
    </Typography>

    <Typography role="heading" variant="h3" component="h2" color="text.secondary">
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
