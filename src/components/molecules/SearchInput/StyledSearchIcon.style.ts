export const searchInputStyles = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  zIndex: 5,
};

export const searchTextFieldStyles = {
  '& fieldset': {
    borderRadius: '3rem',
    backgroundColor: '#ffffffe3',
    zIndex: -1,
  },
  '& .MuiOutlinedInput-input': {
    paddingLeft: '2.5rem',
    color: '#000',
  },
  '& .MuiInputLabel-root': {
    marginLeft: '1.5rem',
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    marginLeft: 0,
  },
};
