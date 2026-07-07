import { IGetListingDetailResponse, IGetListingsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetListingsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  category?: string;
  status?: string;
}

const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query<IGetListingsResponse, GetListingsArgs>({
      query: ({ page, limit, searchParams, category, status }) => ({
        url: "/admin/listings",
        method: "GET",
        params: { page, limit, searchParams, category, status },
      }),
      providesTags: [tagTypes.listing],
    }),
    getListingDetails: builder.query<IGetListingDetailResponse, string>({
      query: (listingId) => ({
        url: `/admin/listings/${listingId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.listing],
    }),
    createListing: builder.mutation({
      query: (req) => ({
        url: "/admin/listings",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.listing],
    }),
    updateListing: builder.mutation({
      query: (req) => ({
        url: `/admin/listings/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.listing],
    }),
    featureListing: builder.mutation({
      query: (req) => ({
        url: `/admin/listings/${req.params.id}/feature`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.listing],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingDetailsQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useFeatureListingMutation,
} = listingApi;

export default listingApi;
