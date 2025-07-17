import { Box, Typography } from '@mui/material';

/**
 * Displays a centered heading indicating that no data or content
 * was found for the current context.
 *
 * Typical use-case: render in place of a list, table, or page section
 * when filters return an empty result set.
 *
 * @component
 *
 * @example
 * ```
 * <NoContent />                          // → “Nothing found…”
 * <NoContent alert="No posts yet" />     // → “No posts yet”
 * ```
 *
 * @param {Object}   props                           – Component props.
 * @param {string}  [props.alert='Nothing found…']   – Message shown to the user.
 *
 * @returns {JSX.Element} A MUI <Box> containing a level-2 <Typography> message.
 */

const NoContent = ({ alert = 'Nothing found...' }: { alert?: string }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h2"
        component="h3"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        {alert ? alert : 'Nothing found...'}
      </Typography>
    </Box>
  );
};

export default NoContent;
