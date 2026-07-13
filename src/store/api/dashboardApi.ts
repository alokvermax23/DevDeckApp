import { baseApi } from './baseApi';

export interface PlatformData {
  platform: string;
  externalUsername: string;
  problemsSolved: number;
  heatmapData: Record<string, number>;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface DashboardData {
  totalProblemsSolved: number;
  githubCommits: number;
  currentStreak: number;
  maxStreak: number;
  platformCount: number;
  heatmap: Record<string, number>;
  githubHeatmap: Record<string, number>;
  problemsHeatmap: Record<string, number>;
  platforms: PlatformData[];
  avatarUrl?: string;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => '/api/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardQuery } = dashboardApi;
