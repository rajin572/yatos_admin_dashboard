import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Toggle block/unblock — same endpoint handles both, no body needed.
    blockUnblockUser: builder.mutation({
      query: (req) => ({
        url: `/admin/block/${req.params.id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.proUser, tagTypes.client],
    }),
  }),
});

export const { useBlockUnblockUserMutation } = userApi;

export default userApi;
