import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import EditProfileForm from "@/Components/Dashboard/Settings/EditProfileForm";
import ChangePasswordForm from "@/Components/Dashboard/Settings/ChangePasswordForm";
import { AllImages } from "@/assets/AllImages";
import { IAdminProfile } from "@/types";
// import { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } from "@/redux/features/settings/settingsApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real profile API data once the endpoint exists.
const DUMMY_PROFILE: IAdminProfile = {
  fullName: "John Doe",
  email: "RcOwT@example.com",
  profileImage: AllImages.profile,
};

const TABS = [
  { label: "Edit Profile", value: "profile" },
  { label: "Change Password", value: "password" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // const { data } = useGetProfileQuery();
  // const profile = data?.data;
  const profile = DUMMY_PROFILE;

  // const [updateProfile] = useUpdateProfileMutation();
  const handleUpdateProfile = async (_values: { fullName: string; profileImage?: File }) => {
    // const res = await tryCatchWrapper(
    //   updateProfile,
    //   { body: { fullName: _values.fullName, profileImage: _values.profileImage } },
    //   { toastLoadingMessage: "Saving changes..." }
    // );
    // if (res?.success) {
    // }
  };

  // const [changePassword] = useChangePasswordMutation();
  const handleChangePassword = async (_values: { currentPassword: string; newPassword: string }) => {
    // const res = await tryCatchWrapper(
    //   changePassword,
    //   { body: { currentPassword: _values.currentPassword, newPassword: _values.newPassword } },
    //   { toastLoadingMessage: "Updating password..." }
    // );
    // if (res?.success) {
    // }
  };

  return (
    <PageWraper title="Settings" description="Manage your account settings">
      <ReuseTabs options={TABS} value={activeTab} onChange={setActiveTab} />

      <div className="bg-white rounded-xl border border-border shadow-sm p-6 max-w-xl">
        {activeTab === "profile" && (
          <>
            <h2 className="text-base font-semibold text-base-color">Edit Profile</h2>
            <p className="text-sm text-secondbase-color mb-5">Update your photo and personal details</p>
            <EditProfileForm profile={profile} onSubmit={handleUpdateProfile} />
          </>
        )}

        {activeTab === "password" && (
          <>
            <h2 className="text-base font-semibold text-base-color">Change Password</h2>
            <p className="text-sm text-secondbase-color mb-5">Update your password to keep your account secure</p>
            <ChangePasswordForm onSubmit={handleChangePassword} />
          </>
        )}
      </div>
    </PageWraper>
  );
};

export default SettingsPage;
