import AvatarButton from '@/components/atoms/AvatarButton/AvatarButton.tsx';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { userMenuStyles } from './UserMenu.styles.ts';

const UserMenu = () => {
  const { user, isLoading, logout } = useAuth0();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    { icon: <AccountCircleIcon />, name: 'My profile', onClick: () => navigate('/profile') },
    {
      icon: <LogoutIcon />,
      name: 'Logout',
      onClick: () =>
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        }),
    },
  ];

  return (
    <SpeedDial
      direction="down"
      ariaLabel="User menu"
      sx={userMenuStyles}
      icon={<AvatarButton avatar={user.picture} isLoading={isLoading} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              title: action.name,
            },
          }}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default UserMenu;
