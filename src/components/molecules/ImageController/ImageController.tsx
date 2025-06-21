import { Avatar, Box } from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface IImageControllerTypes {
  image: File[];
  defaultImageUrl: string;
  altText: string;
  imageUrl: string;
  editMode?: boolean;
  onFilesChange(selectedFiles: File[]): void;
}

const ImageController = ({
  image,
  imageUrl,
  altText,
  defaultImageUrl,
  editMode,
  onFilesChange,
}: IImageControllerTypes) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      onFilesChange([...file]);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', position: 'relative' }}>
      <Avatar
        src={image.length === 0 ? defaultImageUrl : imageUrl}
        alt={altText}
        sx={{
          width: 120,
          height: 120,
          mb: 2,
          border: '4px solid',
          borderColor: 'primary.light',
        }}
      />
      <Box
        onClick={handleAvatarClick}
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          display: editMode ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          '&::before': {
            content: '""',
            width: 120,
            height: 120,
            position: 'absolute',
            borderRadius: '50%',
            backgroundColor: 'primary.light',
            opacity: 0.6,
            transition: 'opacity 200ms ease-in',
            zIndex: 0,
          },
          '&:hover::before': {
            opacity: 0.9,
          },
        }}
      >
        <CloudUploadIcon fontSize="large" sx={{ zIndex: 1 }} />
      </Box>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ImageController;
