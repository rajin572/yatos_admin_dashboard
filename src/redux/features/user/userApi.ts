import { IGetUserDetailResponse, IGetUsersResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetUsersArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  status?: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IGetUsersResponse, GetUsersArgs>({
      query: ({ page, limit, searchParams, status }) => ({
        url: "/admin/users",
        method: "GET",
        params: { page, limit, searchParams, status },
      }),
      providesTags: [tagTypes.user],
    }),
    getUserDetails: builder.query<IGetUserDetailResponse, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    suspendUser: builder.mutation({
      query: (req) => ({
        url: `/admin/users/${req.params.id}/suspend`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    banUser: builder.mutation({
      query: (req) => ({
        url: `/admin/users/${req.params.id}/ban`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useSuspendUserMutation,
  useBanUserMutation,
} = userApi;

export default userApi;
