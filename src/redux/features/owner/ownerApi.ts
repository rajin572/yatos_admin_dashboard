import {
  IGetOwnerDetailResponse,
  IGetOwnersResponse,
  IGetVerificationQueueResponse,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetOwnersArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
}

const ownerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerificationQueue: builder.query<
      IGetVerificationQueueResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }) => ({
        url: "/admin/owners/verification-queue",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.owner],
    }),
    getOwners: builder.query<IGetOwnersResponse, GetOwnersArgs>({
      query: ({ page, limit, searchParams }) => ({
        url: "/admin/owners",
        method: "GET",
        params: { page, limit, searchParams },
      }),
      providesTags: [tagTypes.owner],
    }),
    getOwnerDetails: builder.query<IGetOwnerDetailResponse, string>({
      query: (ownerId) => ({
        url: `/admin/owners/${ownerId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.owner],
    }),
    // body: { status: "approved" | "rejected", notes?: string }
    verifyDocument: builder.mutation({
      query: (req) => ({
        url: `/admin/owners/verification/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.owner],
    }),
    suspendOwner: builder.mutation({
      query: (req) => ({
        url: `/admin/owners/${req.params.id}/suspend`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.owner],
    }),
  }),
});

export const {
  useGetVerificationQueueQuery,
  useGetOwnersQuery,
  useGetOwnerDetailsQuery,
  useVerifyDocumentMutation,
  useSuspendOwnerMutation,
} = ownerApi;

export default ownerApi;
