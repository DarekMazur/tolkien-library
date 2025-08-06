import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TPublications } from '@/lib/types';

export const utilsApi = createApi({
  reducerPath: 'utilsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Utils'],
  endpoints: (builder) => ({
    getLatest: builder.query<TPublications, void>({
      query: () => ({
        url: 'latest',
      }),
      providesTags: ['Utils'],
    }),
  }),
});

export const { useGetLatestQuery } = utilsApi;
