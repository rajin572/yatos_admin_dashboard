import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IPlatformUser } from "@/types";
import { statusBadgeClass, statusTheme } from "./userStatusStyles";

interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  user: IPlatformUser | null;
}

const DetailField = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs text-secondbase-color">{label}</p>
    <div className="text-sm font-medium text-base-color mt-1">{value}</div>
  </div>
);

const UserDetailModal = ({ open, onClose, user }: UserDetailModalProps) => {
  // TODO: once the endpoint exists, fetch by id instead of passing the row record directly:
  // const { data, isFetching } = useGetUserDetailsQuery(userId ?? "", { skip: !open || !userId });

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="User Details"
      description={user ? `Complete information for ${user.fullName}` : undefined}
      maxWidth="sm:max-w-md"
    >
      {user && (
        <div className="flex flex-col gap-5">
          <div className="w-full rounded-full border border-border bg-background-color px-6 py-1.5 text-sm font-medium text-base-color text-center">
            Overview
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <DetailField label="User ID" value={user.userCode} />
            <DetailField
              label="Status"
              value={
                <Tag theme={statusTheme[user.status]} className={statusBadgeClass[user.status]}>
                  {user.status}
                </Tag>
              }
            />
            <DetailField label="Email" value={user.email} />
            <DetailField label="Phone" value={user.phone} />
            <DetailField label="Country" value={user.country} />
            <DetailField label="Join Date" value={user.joinedAt} />
            <DetailField label="Total Bookings" value={user.totalBookings} />
            <DetailField label="Total Spent" value={`$${user.totalSpent.toLocaleString()}`} />
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default UserDetailModal;
