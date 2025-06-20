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
    updateUser: builder.mutation<IUser, { id: string; userName: string; avatar: string }>({
      query: ({ id, userName, avatar }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: { id, userName, avatar },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } = usersApi;
