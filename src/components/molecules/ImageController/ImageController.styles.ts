export const imageControllerAvatarStyles = {
  width: 120,
  height: 120,
  mb: 2,
  border: '4px solid',
  borderColor: 'primary.light',
};

export const imageControllerButtonStyle = {
  cursor: 'pointer',
  position: 'absolute',
  top: 0,
  left: 0,
  width: 120,
  height: 120,

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
};
