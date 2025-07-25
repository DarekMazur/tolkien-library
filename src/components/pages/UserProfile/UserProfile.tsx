import { Card, CardContent, Snackbar, Alert } from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import Error from '@/components/molecules/Error/Error';
import { useMe } from '@/hooks/useMe.tsx';
import Loader from '@/components/atoms/Loader/Loader.tsx';
import { useState } from 'react';
import UserForm from '@/components/molecules/UserForm/UserForm.tsx';
import UserHeader from '@/components/molecules/UserHeader/UserHeader.tsx';

const UserProfile = () => {
  const { user, isLoading } = useMe();
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isLoading) return <Loader isLoading />;

  if (!user) return <Error errorMessage={'User not found.'} />;

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Wrapper>
      <Card sx={{ maxWidth: 800, margin: '0 auto', borderRadius: 2, overflow: 'hidden' }}>
        <UserHeader editMode={editMode} setEditMode={setEditMode} />
        <CardContent sx={{ p: 4 }}>
          <UserForm
            user={user}
            setNotification={setNotification}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </CardContent>
      </Card>
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
