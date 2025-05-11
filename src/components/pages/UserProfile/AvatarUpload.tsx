import React, { createRef, useState } from 'react';
import { Avatar, Button, Typography, Box, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface AvatarUploadProps {
  currentAvatarUrl: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const uploadImageToServer = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(URL.createObjectURL(file));
    }, 1000);
  });
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({ currentAvatarUrl, onAvatarChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputFileRef = createRef<HTMLInputElement>();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target?.files?.[0];
    if (newFile) {
      setIsUploading(true);

      try {
        const localPreviewUrl = URL.createObjectURL(newFile);
        setPreviewUrl(localPreviewUrl);

        const uploadedUrl = await uploadImageToServer(newFile);

        onAvatarChange(uploadedUrl);
      } catch (error) {
        console.error('Error during image transfer:', error);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDelete = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    onAvatarChange(currentAvatarUrl);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Avatar
          src={previewUrl || currentAvatarUrl}
          alt="Avatar"
          sx={{
            width: 120,
            height: 120,
            border: '4px solid',
            borderColor: 'primary.light',
          }}
        />
        {isUploading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
            }}
          >
            <CircularProgress size={50} color="secondary" />
          </Box>
        )}
      </Box>

      <input
        ref={inputFileRef}
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        id="avatar-upload-input"
        disabled={isUploading}
      />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <label htmlFor="avatar-upload-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            size="small"
            disabled={isUploading}
            sx={{ color: 'primary.light' }}
          >
            Choose avatar
          </Button>
        </label>

        {previewUrl && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            size="small"
            disabled={isUploading}
          >
            Delete
          </Button>
        )}
      </Box>

      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, textAlign: 'center' }}>
        Recommended format: JPG/PNG
        <br />
        Recommended size: at least 128x128 px
      </Typography>
    </Box>
  );
};

export default AvatarUpload;
