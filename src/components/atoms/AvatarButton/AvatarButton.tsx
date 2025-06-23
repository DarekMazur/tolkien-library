import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { avatarStyles } from '@/components/atoms/AvatarButton/AvatarButton.styles.ts';

interface IAvatarButtonProps {
  avatar?: string;
  isLoading: boolean;
}

const AvatarButton = ({ avatar, isLoading }: IAvatarButtonProps) => {
  return isLoading ? null : (
    <>
      {!isLoading && avatar === undefined ? (
        <PersonIcon />
      ) : (
        <Avatar alt={'User Avatar'} sx={avatarStyles} src={avatar} />
      )}
    </>
  );
};

export default AvatarButton;
