import { IGetReviewsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetReviewsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  status?: string;
}

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<IGetReviewsResponse, GetReviewsArgs>({
      query: ({ page, limit, searchParams, status }) => ({
        url: "/admin/reviews",
        method: "GET",
        params: { page, limit, searchParams, status },
      }),
      providesTags: [tagTypes.review],
    }),
    // body: { action: "remove", notes?: string }
    moderateReview: builder.mutation({
      query: (req) => ({
        url: `/admin/reviews/${req.params.id}/moderate`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetReviewsQuery, useModerateReviewMutation } = reviewApi;

export default reviewApi;
