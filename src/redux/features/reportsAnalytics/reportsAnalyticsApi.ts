import { IGetReportsAnalyticsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const reportsAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportsAnalytics: builder.query<IGetReportsAnalyticsResponse, void>({
      query: () => ({
        url: "/admin/reports-analytics",
        method: "GET",
      }),
      providesTags: [tagTypes.reportsAnalytics],
    }),
  }),
});

export const { useGetReportsAnalyticsQuery } = reportsAnalyticsApi;

export default reportsAnalyticsApi;
