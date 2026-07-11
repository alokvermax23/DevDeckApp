import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Removed RootState import to prevent circular dependency

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface DashboardData {
  totalProblemsSolved: number;
  currentStreak: number;
  maxStreak: number;
  platformCount: number;
  heatmap: Record<string, number>;
  platforms: PlatformData[];
  avatarUrl?: string;
}

export interface PlatformData {
  platform: string;
  externalUsername: string;
  problemsSolved: number;
  heatmapData: Record<string, number>;
}

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
    checkUsername: builder.query<{ available: boolean }, string>({
      query: (username) => `/api/user/check-username?username=${username}`,
    }),
    updateUsername: builder.mutation<void, { username: string }>({
      query: (body) => ({
        url: '/api/user/username',
        method: 'PATCH',
        body,
      }),
    }),
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => '/api/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useCheckHealthQuery,
  useCheckUsernameQuery,
  useUpdateUsernameMutation,
  useGetDashboardQuery,
} = baseApi;
