import { baseApi } from './baseApi';

export interface LinkPlatformRequest {
  platform: string;
  username: string;
}

export interface PlatformLink {
  id: string;
  userId: string;
  platform: string;
  externalUsername: string;
  isValid: boolean;
  lastSyncedAt: string | null;
  lastSyncStatus: string;
  createdAt: string;
}

export interface LinkPlatformResponse {
  message: string;
  platformLink: PlatformLink;
}

export interface GetLinkedPlatformsResponse {
  platformLinks: PlatformLink[];
}

export const platformApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLinkedPlatforms: builder.query<GetLinkedPlatformsResponse, void>({
      query: () => '/api/platforms',
      providesTags: ['Platform'],
    }),
    linkPlatform: builder.mutation<LinkPlatformResponse, LinkPlatformRequest>({
      query: (body) => ({
        url: '/api/platforms/link',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Platform'],
    }),
    refreshAll: builder.mutation<void, void>({
      query: () => ({
        url: '/api/platforms/refresh-all',
        method: 'POST',
      }),
      invalidatesTags: ['Platform', 'Dashboard'],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useLinkPlatformMutation, 
  useGetLinkedPlatformsQuery,
  useRefreshAllMutation 
} = platformApi;
