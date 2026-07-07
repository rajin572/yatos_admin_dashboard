import { useState } from "react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import SpinLoader from "@/Components/ui/CustomUi/SpinLoader";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { useGetClientDetailsQuery } from "@/redux/features/client/clientApi";
import { useBlockUnblockUserMutation } from "@/redux/features/user/userApi";
import { IClientDetail } from "@/types";
import { formatDate } from "@/utils/dateFormet";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { getImageUrl } from "@/helpers/config/envConfig";

interface ClientDetailModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-secondbase-color text-xs shrink-0">{label}</span>
    <span className="font-medium text-base-color text-xs text-right">
      {value ?? "-"}
    </span>
  </div>
);

const ClientDetailModal = ({
  open,
  onClose,
  userId,
}: ClientDetailModalProps) => {
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);

  const { data, isFetching } = useGetClientDetailsQuery(userId ?? "", {
    skip: !open || !userId,
    refetchOnMountOrArgChange: true,
  });

  const [blockUnblockUser] = useBlockUnblockUserMutation();

  const client: IClientDetail | undefined = data?.data;

  const initials =
    client?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "C";

  const profileImageUrl = client?.profileImage
    ? `${getImageUrl()}${client.profileImage}`
    : undefined;

  const handleBlockUnblock = async () => {
    if (!client) return;
    const res = await tryCatchWrapper(
      blockUnblockUser,
      { params: { id: client._id } },
      {
        toastLoadingMessage: client.isBlocked
          ? "Unblocking user..."
          : "Blocking user...",
        toastSuccessMessage: client.isBlocked
          ? "User unblocked successfully."
          : "User blocked successfully.",
      }
    );
    if (res?.success) {
      setBlockConfirmOpen(false);
      onClose();
    }
  };

  return (
    <>
      <ReusableModal
        open={open}
        onOpenChange={(v) => !v && onClose()}
        title="Client Details"
        maxWidth="sm:max-w-md"
        footer={
          client && (
            <div className="flex gap-3 w-full">
              {client.isBlocked ? (
                <Button
                  className="flex-1 py-5 text-base bg-green-500 hover:bg-green-600"
                  onClick={() => setBlockConfirmOpen(true)}
                >
                  Unblock User
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="flex-1 py-5 text-base"
                  onClick={() => setBlockConfirmOpen(true)}
                >
                  Block User
                </Button>
              )}
            </div>
          )
        }
      >
        <div className="px-5 pb-2">
          {isFetching ? (
            <div className="py-16 flex justify-center">
              <SpinLoader />
            </div>
          ) : !client ? (
            <div className="py-10 text-center text-secondbase-color text-sm">
              Failed to load client details.
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src={profileImageUrl} alt={client.fullName} />
                  <AvatarFallback className="bg-base-color text-white font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-base font-semibold text-base-color">
                    {client.fullName}
                  </h3>
                  <p className="text-xs text-secondbase-color">{client.email}</p>
                </div>
                <div className="ml-auto">
                  <Tag theme={client.isBlocked ? "error" : "success"}>
                    {client.isBlocked ? "Blocked" : "Active"}
                  </Tag>
                </div>
              </div>

              {/* Basic Information */}
              <div>
                <h4 className="text-xs font-semibold text-base-color mb-3 uppercase tracking-wide">
                  Basic Information
                </h4>
                <div className="space-y-2">
                  <DetailRow label="Email" value={client.email || "-"} />
                  <DetailRow label="Phone" value={client.phone || "-"} />
                  <DetailRow label="Joined" value={formatDate(client.createdAt)} />
                  <DetailRow label="Total Bookings" value={client.totalBookings} />
                </div>
              </div>

              {/* Address */}
              {client.userAddress.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-base-color mb-3 uppercase tracking-wide">
                    Addresses
                  </h4>
                  <div className="space-y-3">
                    {client.userAddress.map((addr) => (
                      <div
                        key={addr._id}
                        className="rounded-md border border-border p-3 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-base-color capitalize">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <Tag theme="blue">Default</Tag>
                          )}
                        </div>
                        <p className="text-xs text-secondbase-color">
                          {[addr.address, addr.city, addr.country, addr.postalCode]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ReusableModal>

      <ConfirmModal<IClientDetail>
        open={blockConfirmOpen}
        onCancel={() => setBlockConfirmOpen(false)}
        currentRecord={client ?? null}
        onConfirm={handleBlockUnblock}
        title={client?.isBlocked ? "Unblock User" : "Block User"}
        description={
          client?.isBlocked
            ? `Are you sure you want to unblock ${client?.fullName}? They will be able to access their account again.`
            : `Are you sure you want to block ${client?.fullName}? They will not be able to access their account.`
        }
        confirmText={client?.isBlocked ? "Unblock" : "Block"}
        cancelText="Cancel"
        variant={client?.isBlocked ? "success" : "danger"}
        iconPreset={client?.isBlocked ? "unblock" : "block"}
      />
    </>
  );
};

export default ClientDetailModal;
