import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://2fbi059n43.execute-api.ap-south-1.amazonaws.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Platform', 'Dashboard'],
  endpoints: (builder) => ({
    checkHealth: builder.query<{ message: string }, void>({
      query: () => '/',
    }),
  }),
});

export const {
  useCheckHealthQuery,
} = baseApi;
