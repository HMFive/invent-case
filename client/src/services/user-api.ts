import { User, UserDetail } from '../types/user';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: `/users/`,
      }),
    }),
    getUser: builder.query<UserDetail, number>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ['User'],
    }),
    returnBook: builder.mutation({
      query: ({ userId, bookId, rating }) => ({
        url: `/users/${userId}/return/${bookId}`,
        method: 'POST',
        body: { score: rating },
      }),
      invalidatesTags: ['User', 'Book'],
    }),
    lendBook: builder.mutation({
      query: ({ userId, bookId }) => ({
        url: `/users/${userId}/borrow/${bookId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useReturnBookMutation,
  useLendBookMutation,
} = userApi;
