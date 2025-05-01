import { configureStore } from '@reduxjs/toolkit';
import { navigationApi } from './api/navigation';
import { articlesApi } from './api/articles.ts';

export type RootState = ReturnType<typeof store.getState>;

export * from './api/navigation';
export * from './api/articles';

export const store = configureStore({
  reducer: {
    [navigationApi.reducerPath]: navigationApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(navigationApi.middleware).concat(articlesApi.middleware),
});
