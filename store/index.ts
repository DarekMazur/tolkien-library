import { configureStore } from '@reduxjs/toolkit';
import { navigationApi } from './api/navigation';
import { articlesApi } from './api/articles.ts';
import { rolesApi } from './api/roles.ts';
import { usersApi } from './api/users';

export type RootState = ReturnType<typeof store.getState>;

export * from './api/navigation';
export * from './api/articles';
export * from './api/roles';
export * from './api/users';

export const store = configureStore({
  reducer: {
    [navigationApi.reducerPath]: navigationApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(navigationApi.middleware)
      .concat(articlesApi.middleware)
      .concat(rolesApi.middleware)
      .concat(usersApi.middleware),
});
