import { useAuth0 } from '@auth0/auth0-react';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import Loader from '@/components/atoms/Loader/Loader.tsx';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loader isLoading isCenter margin={0} isTransparent />;

  return (
    isAuthenticated &&
    user && (
      <Wrapper sx={{ display: 'flex', alignItems: 'center' }}>
        <Card sx={{ minWidth: '40rem', maxWidth: '50rem' }}>
          <CardHeader
            avatar={<Avatar src={user.picture} />}
            title={user.username ?? user.name}
            subheader={user.email}
          />
          <CardContent>
            <Typography variant="subtitle1">
              {user.email_verified ? null : 'You need to verify email'}
            </Typography>
            {user[import.meta.env.VITE_AUTH0_ROLES_DOMAIN].map((item: string) => (
              <Typography key={item}>{item}</Typography>
            ))}
            <Typography>{user.email}</Typography>
          </CardContent>
        </Card>
      </Wrapper>
    )
  );
};

export default UserProfile;
