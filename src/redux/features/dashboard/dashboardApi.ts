import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboard_url = "/dashboard";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Returns: { earnings, totalPros, totalUsers, bookingsThisMonth, ... }
    getOverviewStats: builder.query({
      query: () => ({
        url: `${dashboard_url}/overview-stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),

    // Returns: { data: [{ month, value }] }
    getUserOverviewData: builder.query({
      query: ({ year }) => ({
        url: `${dashboard_url}/user-overview?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),

    // Returns: { data: [{ month, value }] }
    getEarningOverviewData: builder.query({
      query: ({ year }) => ({
        url: `${dashboard_url}/earning-overview?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),

    // Returns: { data: [{ id, name, initials, bookings }] }
    getTopStylists: builder.query({
      query: () => ({
        url: `${dashboard_url}/top-stylists`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),

    // Returns: { data: [{ id, title, subtitle, count, status, actionLabel, actionColor }] }
    getActionNeeded: builder.query({
      query: () => ({
        url: `${dashboard_url}/action-needed`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const {
  useGetOverviewStatsQuery,
  useGetUserOverviewDataQuery,
  useGetEarningOverviewDataQuery,
  useGetTopStylistsQuery,
  useGetActionNeededQuery,
} = dashboardApi;

export default dashboardApi;
