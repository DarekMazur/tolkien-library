import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INewsEntry } from '@/lib/types';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query<INewsEntry[], void>({
      query: () => ({
        url: 'articles',
      }),
      providesTags: ['Articles'],
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
