import { IconButton, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SetStateAction } from 'react';
import { userHeaderWrapperStyles } from '@/components/molecules/UserHeader/UserHeader.styles.ts';

interface IUserHeaderProps {
  editMode: boolean;
  setEditMode: (value: SetStateAction<boolean>) => void;
}

const UserHeader = ({ editMode, setEditMode }: IUserHeaderProps) => {
  return (
    <Paper sx={userHeaderWrapperStyles}>
      <Typography variant="h4">Your profile</Typography>
      <Typography variant="subtitle1">Manage your data</Typography>
      {!editMode && (
        <IconButton
          aria-label="edit"
          role="button"
          sx={{ position: 'absolute', right: 14, top: 14 }}
          onClick={() => setEditMode(true)}
        >
          <EditIcon fontSize="large" />
        </IconButton>
      )}
    </Paper>
  );
};

export default UserHeader;
