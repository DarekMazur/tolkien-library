export const StyledSearchInput = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  zIndex: 5,
};

export const StyledSearchIcon: React.CSSProperties = {
  position: 'absolute',
  left: '0.5rem',
};

export const StyledSearchTextField = {
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
