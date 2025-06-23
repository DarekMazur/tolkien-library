import { Grid, TextField, Typography, Box, Chip, Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ChangeEvent, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useUpdateUserMutation } from '../../../../store';
import ImageController from '@/components/molecules/ImageController/ImageController.tsx';
import { theme } from '@/lib/theme';
import { IUser } from '@/lib/types.ts';

interface IUserFormProps {
  user: IUser;
  editMode: boolean;
  setEditMode: (value: SetStateAction<boolean>) => void;
  setNotification: (
    value: SetStateAction<{
      open: boolean;
      message: string;
      severity: string;
    }>,
  ) => void;
}

const UserForm = ({ user, setNotification, editMode, setEditMode }: IUserFormProps) => {
  const [updateUser] = useUpdateUserMutation();
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    avatar: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        userName: user.userName,
        avatar: user.avatar,
      });
    }
  }, [user]);

  useEffect(() => {
    if (image.length > 0) {
      setImageUrl(URL.createObjectURL(image[0]));
      setIsNewData(true);
    }
  }, [image]);

  useEffect(() => {
    if (imageUrl && user) {
      const fetchImage = async () => {
        const myImage = await fetch(imageUrl);
        const myBlob = await myImage.blob();

        console.log(myImage);
        console.log(myBlob);

        const imageFormData = new FormData();
        imageFormData.append('files', myBlob, imageUrl);

        await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
          method: 'POST',
          body: imageFormData,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const file = { ...data[0] };
            setFormData((prev) => ({ ...prev, avatar: file.url }));
          });
      };
      // noinspection JSIgnoredPromiseFromCall
      fetchImage();
    }
  }, [imageUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, userName: value }));
    setIsNewData(value !== user?.userName);
  };

  const handleCancel = () => {
    setFormData({
      id: user?.id || '',
      userName: user?.userName || '',
      avatar: user?.avatar || '',
    });
    setImage([]);
    setImageUrl(user?.avatar);
    setEditMode(false);
    setIsNewData(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <Box component="form" role="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={4}>
        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageController
            image={image}
            imageUrl={imageUrl as string}
            altText={user.userName}
            defaultImageUrl={user.avatar}
            editMode={editMode}
            onFilesChange={(selectedFiles) => setImage(selectedFiles)}
          />
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
                  !user.emailVerified ? 'Email has not been verified. Check your mailbox.' : ''
                }
                error={!user.emailVerified}
              />
            </Grid>
            <Grid>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Role:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label={user.role.roleName} size="small" color="primary" variant="outlined" />
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
              role="button"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={isUpdating || !isNewData}
              sx={{ color: theme.palette.secondary.main }}
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
  );
};

export default UserForm;
