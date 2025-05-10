import { useAuth0 } from '@auth0/auth0-react';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Typography } from '@mui/material';
import Loader from '@/components/atoms/Loader/Loader.tsx';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loader isLoading isCenter margin={0} isTransparent />;

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
