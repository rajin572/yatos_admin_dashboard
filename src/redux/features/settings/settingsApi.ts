import { IGetProfileResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface UpdateProfileArgs {
  fullName: string;
  profileImage?: File;
}

interface ChangePasswordArgs {
  currentPassword: string;
  newPassword: string;
}

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IGetProfileResponse, void>({
      query: () => ({
        url: "/admin/settings/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.settings],
    }),
    updateProfile: builder.mutation<unknown, UpdateProfileArgs>({
      query: ({ fullName, profileImage }) => {
        const formData = new FormData();
        formData.append("fullName", fullName);
        if (profileImage) formData.append("profileImage", profileImage);
        return {
          url: "/admin/settings/profile",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.settings],
    }),
    changePassword: builder.mutation<unknown, ChangePasswordArgs>({
      query: (body) => ({
        url: "/admin/settings/change-password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } = settingsApi;

export default settingsApi;
