import { Avatar, ButtonBase } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {
  avatarButtonStyles,
  avatarStyles,
} from '@/components/atoms/AvatarButton/AvatarButton.styles.ts';

interface IAvatarButtonProps {
  avatar?: string;
  isLoading: boolean;
}

const AvatarButton = ({ avatar, isLoading }: IAvatarButtonProps) => {
  return isLoading ? null : (
    <ButtonBase role="button" onClick={() => {}} sx={avatarButtonStyles}>
      {!isLoading && avatar === undefined ? (
        <PersonIcon />
      ) : (
        <Avatar alt={'User Avatar'} sx={avatarStyles} src={avatar} />
      )}
    </ButtonBase>
  );
};

export default AvatarButton;
