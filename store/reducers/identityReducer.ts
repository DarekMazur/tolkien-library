import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIdentityProps } from '@/lib/types';

const initialIdentity = null as IIdentityProps | null;

const identitySlice = createSlice({
  name: 'identity',
  initialState: initialIdentity,
  reducers: {
    modifyIdentity(_state, action: PayloadAction<IIdentityProps | null>) {
      return action.payload;
    },
  },
});

export const { modifyIdentity } = identitySlice.actions;
export default identitySlice.reducer;
