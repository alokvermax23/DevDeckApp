import { baseApi } from './baseApi';

export interface UserProfileResponse {
  message: string;
  user: {
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
  };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkUsername: builder.query<{ available: boolean }, string>({
      query: (username) => `/api/user/check-username?username=${username}`,
    }),
    updateUsername: builder.mutation<{ message: string }, { username: string }>({
      query: (body) => ({
        url: '/api/user/username',
        method: 'PATCH',
        body,
      }),
    }),
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => '/api/user/me',
    }),
  }),
  overrideExisting: false,
});

export const { 
  useCheckUsernameQuery, 
  useUpdateUsernameMutation, 
  useGetUserProfileQuery 
} = userApi;
