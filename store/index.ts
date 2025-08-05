import { configureStore } from '@reduxjs/toolkit';
import { navigationApi } from './api/navigation';
import { articlesApi } from './api/articles.ts';
import { rolesApi } from './api/roles.ts';
import { usersApi } from './api/users';
import identityReducer from './reducers/identityReducer.ts';
import { utilsApi } from './api/utils.ts';

export * from './api/navigation';
export * from './api/articles';
export * from './api/roles';
export * from './api/users';
export * from './api/utils';

export const store = configureStore({
  reducer: {
    [navigationApi.reducerPath]: navigationApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [utilsApi.reducerPath]: utilsApi.reducer,
    identity: identityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(navigationApi.middleware)
      .concat(articlesApi.middleware)
      .concat(rolesApi.middleware)
      .concat(usersApi.middleware)
      .concat(utilsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
