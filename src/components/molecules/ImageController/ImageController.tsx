import { Avatar, Box } from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  imageControllerAvatarStyles,
  imageControllerButtonStyle,
} from '@/components/molecules/ImageController/ImageController.styles.ts';

interface IImageControllerTypes {
  image: File[];
  defaultImageUrl: string;
  altText: string;
  imageUrl: string;
  editMode?: boolean;
  onFilesChange?: (selectedFiles: File[]) => void;
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
      if (onFilesChange) {
        onFilesChange([...file]);
      }
    }
  };

  return (
    <Box sx={{ textAlign: 'center', position: 'relative' }}>
      <Avatar
        src={image.length === 0 ? defaultImageUrl : imageUrl}
        alt={altText}
        sx={imageControllerAvatarStyles}
      />
      <Box
        onClick={handleAvatarClick}
        sx={{ ...imageControllerButtonStyle, display: editMode ? 'flex' : 'none' }}
      >
        <CloudUploadIcon fontSize="large" sx={{ zIndex: 1 }} />
      </Box>
      <input
        type="file"
        accept="image/*"
        role="textbox"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ImageController;
