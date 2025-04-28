import { configureStore } from '@reduxjs/toolkit';
import { navigationApi } from './api/navigation';

export type RootState = ReturnType<typeof store.getState>;

export * from './api/navigation';

export const store = configureStore({
  reducer: {
    [navigationApi.reducerPath]: navigationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(navigationApi.middleware),
});
