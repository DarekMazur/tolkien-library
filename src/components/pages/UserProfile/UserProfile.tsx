import { Card, CardContent, Typography, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { useMe } from '@/hooks/useMe.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import UserForm from '@/components/molecules/UserForm/UserForm.tsx';

const UserProfile = () => {
  const { user, isLoading } = useMe();
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isLoading) return <Loader isLoading />;

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
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
            <UserForm
              user={user}
              setNotification={setNotification}
              editMode={editMode}
              setEditMode={setEditMode}
            />
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
