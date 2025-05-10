import { useAuth0 } from '@auth0/auth0-react';
import Backdrop from '@mui/material/Backdrop';
import { theme } from '@/lib/theme.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Typography } from '@mui/material';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading)
    return (
      <Wrapper isCenter margin={0} isTransparent>
        <Backdrop sx={{ color: theme.palette.secondary.main, zIndex: 999 }} open>
          <CircularProgress color="inherit" size={100} />
        </Backdrop>
      </Wrapper>
    );

  return (
    isAuthenticated &&
    user && (
      <Wrapper>
        <img src={user.picture} alt={user.name} className="user-avatar" />
        <Typography variant="h3">{user.username ?? user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Wrapper>
    )
  );
};

export default UserProfile;
