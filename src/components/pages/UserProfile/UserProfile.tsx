import {
  Avatar,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useMe } from '@/hooks/useMe.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';

const UserProfile = () => {
  const { user, isLoading } = useMe();

  if (isLoading) return <Loader isLoading />;

  return (
    <Wrapper>
      {user ? (
        <Card sx={{ maxWidth: 800, margin: '0 auto', borderRadius: 2, overflow: 'hidden' }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              borderRadius: 0,
            }}
          >
            <Typography variant="h4">Your profile</Typography>
            <Typography variant="subtitle1">Manage your data</Typography>
          </Paper>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={() => {}} noValidate>
              <Grid container spacing={4}>
                <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={user.avatar}
                      alt={user.userName}
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        border: '4px solid',
                        borderColor: 'primary.light',
                      }}
                    />
                  </Box>
                </Grid>
                <Grid>
                  <Grid container spacing={3}>
                    <Grid>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={user.userName}
                        onChange={() => {}}
                        disabled
                        variant="filled"
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={user.email}
                        disabled={true}
                        variant="filled"
                        helperText={
                          !user.emailVerified
                            ? 'Email has not been verified. Check your mailbox.'
                            : ''
                        }
                        error={!user.emailVerified}
                      />
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                        Role:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip
                          label={user.role.roleName}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </Wrapper>
  );
};

export default UserProfile;
