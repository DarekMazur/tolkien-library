import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMainMenuList } from '@/lib/types';

export const navigationApi = createApi({
  reducerPath: 'navigationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Navigation'],
  endpoints: (builder) => ({
    getNavigation: builder.query<IMainMenuList[], void>({
      query: () => ({
        url: 'navigation',
      }),
      providesTags: ['Navigation'],
    }),
  }),
});

export const { useGetNavigationQuery } = navigationApi;
