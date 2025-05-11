import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  Paper,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import AvatarUpload from './AvatarUpload.tsx';

const UserProfile = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userMetadata, setUserMetadata] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    picture: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || user.name || '',
        email: user.email || '',
        picture: user.picture || '',
      });

      getUserMetadata();
    }
  }, [user]);

  const getUserMetadata = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
        scope: 'read:current_user_metadata',
      });

      const userDetailsByIdUrl = `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();
      setUserMetadata(user_metadata);
    } catch (error) {
      console.error('Error while retrieving metadata:', error);
      setNotification({
        open: true,
        message: 'Failed to retrieve user data.',
        severity: 'error',
      });
    }
  };

  const updateUserMetadata = async () => {
    setIsUpdating(true);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
        scope: 'update:current_user_metadata update:users',
      });

      const userDetailsByIdUrl = `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;

      await fetch(userDetailsByIdUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_metadata: {
            ...userMetadata,
            custom_username: formData.username,
          },
          ...(formData.picture !== user.picture && { picture: formData.picture }),
        }),
      });

      await getUserMetadata();
      setEditMode(false);
      setNotification({
        open: true,
        message: 'Profile successfully updated.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error during metadata update:', error);
      setNotification({
        open: true,
        message: 'Profile failed to update.',
        severity: 'error',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = (newPictureUrl) => {
    setFormData((prev) => ({ ...prev, picture: newPictureUrl }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserMetadata();
  };

  const handleCancel = () => {
    setFormData({
      username: user.username || user.name || '',
      email: user.email || '',
      picture: user.picture || '',
    });
    setEditMode(false);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) {
    return (
      <Wrapper isCenter>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <CircularProgress />
        </Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
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
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {editMode ? (
                  <AvatarUpload
                    currentAvatarUrl={formData.picture}
                    onAvatarChange={handlePictureChange}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={user.picture}
                      alt={user.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        border: '4px solid',
                        borderColor: 'primary.light',
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {user.name}
                    </Typography>
                  </Box>
                )}
                {!editMode && (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                    disabled={isUpdating}
                    sx={{ mt: 2 }}
                  >
                    Edit profile
                  </Button>
                )}
              </Grid>

              <Grid item xs={12} sm={8} md={9}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!editMode || isUpdating}
                      variant={editMode ? 'outlined' : 'filled'}
                      InputProps={{ readOnly: !editMode }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      disabled={true}
                      variant="filled"
                      helperText={
                        !user.email_verified
                          ? 'Email has not been verified. Check your mailbox.'
                          : ''
                      }
                      error={!user.email_verified}
                    />
                  </Grid>

                  {user[import.meta.env.VITE_AUTH0_ROLES_DOMAIN] && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                        Role:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {user[import.meta.env.VITE_AUTH0_ROLES_DOMAIN].map((role, index) => (
                          <Chip
                            key={index}
                            label={role}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              {editMode && (
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={isUpdating}
                    sx={{ color: 'primary.light' }}
                  >
                    {isUpdating ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1 }} /> Updating...
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default UserProfile;
