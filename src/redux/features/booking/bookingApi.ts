import {
  IGetBookingDetailResponse,
  IGetBookingsResponse,
  IGetCancellationsResponse,
  IGetDisputesResponse,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetBookingsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  status?: string;
}

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<IGetBookingsResponse, GetBookingsArgs>({
      query: ({ page, limit, searchParams, status }) => ({
        url: "/admin/bookings",
        method: "GET",
        params: { page, limit, searchParams, status },
      }),
      providesTags: [tagTypes.booking],
    }),
    getBookingDetails: builder.query<IGetBookingDetailResponse, string>({
      query: (bookingId) => ({
        url: `/admin/bookings/${bookingId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    getDisputes: builder.query<IGetDisputesResponse, { page?: number; limit?: number }>({
      query: ({ page, limit }) => ({
        url: "/admin/disputes",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.booking],
    }),
    // body: { action: "approve" | "reject" | "partial_refund", notes?: string }
    resolveDispute: builder.mutation({
      query: (req) => ({
        url: `/admin/disputes/${req.params.id}/resolve`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    getCancellations: builder.query<IGetCancellationsResponse, { page?: number; limit?: number }>({
      query: ({ page, limit }) => ({
        url: "/admin/cancellations",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.booking],
    }),
    issueRefund: builder.mutation({
      query: (req) => ({
        url: `/admin/cancellations/${req.params.id}/refund`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingDetailsQuery,
  useGetDisputesQuery,
  useResolveDisputeMutation,
  useGetCancellationsQuery,
  useIssueRefundMutation,
} = bookingApi;

export default bookingApi;
