import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRegisteredUser, IUser } from '@/lib/types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: 'users',
      }),
      providesTags: ['Users'],
    }),
    addUser: builder.mutation<IUser, IRegisteredUser>({
      query: (user) => ({
        url: `users`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = usersApi;
