import { IGetTransactionsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetTransactionsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  type?: string;
  status?: string;
}

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<IGetTransactionsResponse, GetTransactionsArgs>({
      query: ({ page, limit, searchParams, type, status }) => ({
        url: "/admin/transactions",
        method: "GET",
        params: { page, limit, searchParams, type, status },
      }),
      providesTags: [tagTypes.payment],
    }),
    processRefund: builder.mutation({
      query: (req) => ({
        url: `/admin/transactions/${req.params.id}/refund`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    retryPayment: builder.mutation({
      query: (req) => ({
        url: `/admin/transactions/${req.params.id}/retry`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useGetTransactionsQuery, useProcessRefundMutation, useRetryPaymentMutation } = paymentApi;

export default paymentApi;
