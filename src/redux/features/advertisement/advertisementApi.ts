import { IGetAdDetailResponse, IGetAdvertisementsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetAdvertisementsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  placement?: string;
}

const advertisementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdvertisements: builder.query<IGetAdvertisementsResponse, GetAdvertisementsArgs>({
      query: ({ page, limit, searchParams, placement }) => ({
        url: "/admin/advertisements",
        method: "GET",
        params: { page, limit, searchParams, placement },
      }),
      providesTags: [tagTypes.advertisement],
    }),
    getAdDetails: builder.query<IGetAdDetailResponse, string>({
      query: (adId) => ({
        url: `/admin/advertisements/${adId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.advertisement],
    }),
    createAdvertisement: builder.mutation({
      query: (req) => ({
        url: "/admin/advertisements",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.advertisement],
    }),
    updateAdvertisement: builder.mutation({
      query: (req) => ({
        url: `/admin/advertisements/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.advertisement],
    }),
    toggleFeaturedListing: builder.mutation({
      query: (req) => ({
        url: `/admin/advertisements/featured-listings/${req.params.id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.advertisement],
    }),
  }),
});

export const {
  useGetAdvertisementsQuery,
  useGetAdDetailsQuery,
  useCreateAdvertisementMutation,
  useUpdateAdvertisementMutation,
  useToggleFeaturedListingMutation,
} = advertisementApi;

export default advertisementApi;
