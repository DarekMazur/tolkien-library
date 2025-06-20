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
  IconButton,
  Snackbar,
  Alert,
  Button,
  CircularProgress,
} from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useMe } from '@/hooks/useMe.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useUpdateUserMutation } from '../../../../store';

const UserProfile = () => {
  const { user, isLoading } = useMe();
  const [updateUser] = useUpdateUserMutation();
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    avatar: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isLoading) return <Loader isLoading />;

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        userName: user.userName,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleCancel = () => {
    setFormData({
      id: user?.id || '',
      userName: user?.userName || '',
      avatar: user?.avatar || '',
    });
    setEditMode(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    setEditMode(false);
    updateUser({
      id: user!.id,
      userName: formData.userName,
      avatar: formData.avatar,
    });
    setNotification({
      open: true,
      message: 'Profile updated successfully.',
      severity: 'success',
    });
    setIsUpdating(false);
  };

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
              position: 'relative',
            }}
          >
            <Typography variant="h4">Your profile</Typography>
            <Typography variant="subtitle1">Manage your data</Typography>
            {!editMode && (
              <IconButton
                sx={{ position: 'absolute', right: 14, top: 14 }}
                onClick={() => setEditMode(true)}
              >
                <EditIcon fontSize="large" />
              </IconButton>
            )}
          </Paper>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
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
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        disabled={!editMode || isUpdating}
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
                {editMode && (
                  <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
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
                    >
                      {isUpdating ? (
                        <>
                          <CircularProgress size={24} sx={{ mr: 1 }} /> Saving...
                        </>
                      ) : (
                        'Save changes'
                      )}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      ) : null}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default UserProfile;
