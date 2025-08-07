import { Typography } from '@mui/material';

/**
 * BoardHeader component displays the main header section of the admin panel.
 *
 * It shows a title and the role of the currently logged-in user.
 *
 * @param {Object} props - Component props
 * @param {string} props.userRole - Role of the currently logged-in user (e.g., "Admin", "Moderator")
 *
 * @returns {JSX.Element} The rendered header with user role information
 */

const BoardHeader = ({ userRole }: { userRole: string }) => {
  return (
    <>
      <Typography variant="h2">Admin Panel</Typography>
      <Typography variant="h3">You're logged in as {userRole}</Typography>
    </>
  );
};

export default BoardHeader;
