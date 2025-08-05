import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IFanEditionsProps,
  IFanzinProps,
  IBookProps,
  IPublicationProps,
  IPublisherProps,
  ITranslatorProps,
} from '@/lib/types';

export const utilsApi = createApi({
  reducerPath: 'utilsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Utils'],
  endpoints: (builder) => ({
    getLatest: builder.query<
      | IBookProps
      | IFanzinProps
      | IFanEditionsProps
      | IPublicationProps
      | IPublisherProps
      | ITranslatorProps,
      void
    >({
      query: () => ({
        url: 'latest',
      }),
      providesTags: ['Utils'],
    }),
  }),
});

export const { useGetLatestQuery } = utilsApi;
