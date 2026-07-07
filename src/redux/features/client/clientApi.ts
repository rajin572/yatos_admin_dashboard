import { IGetClientDetailResponse, IGetClientsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetClientsArgs {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query<IGetClientsResponse, GetClientsArgs>({
      query: ({ page, limit, searchTerm }) => ({
        url: "/admin/all-users",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.client],
    }),
    getClientDetails: builder.query<IGetClientDetailResponse, string>({
      query: (userId) => ({
        url: `/admin/user-details/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.client],
    }),
  }),
});

export const { useGetAllClientsQuery, useGetClientDetailsQuery } = clientApi;

export default clientApi;
