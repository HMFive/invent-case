import { Book } from '../types/book';
import { api } from './api';

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: `/books/`,
      }),
    }),
    getBook: builder.query<Book, number>({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ['Book'],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery } = bookApi;
