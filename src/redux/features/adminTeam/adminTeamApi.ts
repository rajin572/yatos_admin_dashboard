import { AdminRole, IGetAdminTeamMembersResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface InviteAdminBody {
  fullName: string;
  email: string;
  role: AdminRole;
}

interface UpdateAdminBody {
  fullName?: string;
  email?: string;
  role?: AdminRole;
}

const adminTeamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminTeamMembers: builder.query<IGetAdminTeamMembersResponse, void>({
      query: () => ({
        url: "/admin/team",
        method: "GET",
      }),
      providesTags: [tagTypes.adminTeam],
    }),
    inviteAdmin: builder.mutation<unknown, InviteAdminBody>({
      query: (body) => ({
        url: "/admin/team/invite",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.adminTeam],
    }),
    updateAdmin: builder.mutation<unknown, { params: { id: string }; body: UpdateAdminBody }>({
      query: (req) => ({
        url: `/admin/team/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.adminTeam],
    }),
    removeAdmin: builder.mutation<unknown, { params: { id: string } }>({
      query: (req) => ({
        url: `/admin/team/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.adminTeam],
    }),
  }),
});

export const {
  useGetAdminTeamMembersQuery,
  useInviteAdminMutation,
  useUpdateAdminMutation,
  useRemoveAdminMutation,
} = adminTeamApi;

export default adminTeamApi;
