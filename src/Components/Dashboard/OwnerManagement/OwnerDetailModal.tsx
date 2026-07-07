import { Calendar, DollarSign, Mail, Phone, Shield, Star, Tag as TagIcon } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IOwner } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
import { categoryIcon, categoryLabel } from "@/utils/categoryDisplay";

interface OwnerDetailModalProps {
  open: boolean;
  onClose: () => void;
  owner: IOwner | null;
}

const ContactField = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2 rounded-lg border border-border p-3">
    <Icon className="size-4 text-secondary-color shrink-0" />
    <div>
      <p className="text-xs text-secondbase-color">{label}</p>
      <p className="text-sm font-medium text-base-color">{value}</p>
    </div>
  </div>
);

const MetricBox = ({
  icon: Icon,
  value,
  label,
  valueClassName,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  valueClassName?: string;
}) => (
  <div className="rounded-lg border border-border p-3">
    <Icon className="size-4 text-secondary-color mb-2" />
    <p className={`text-lg font-bold text-base-color ${valueClassName ?? ""}`}>{value}</p>
    <p className="text-xs text-secondbase-color">{label}</p>
  </div>
);

const vehicleStatusTheme = {
  active: "success" as const,
  maintenance: "warning" as const,
};

const OwnerDetailModal = ({ open, onClose, owner }: OwnerDetailModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Owner Details"
      description="Complete profile and performance overview"
      maxWidth="sm:max-w-lg"
      footer={
        <div className="flex justify-end w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      {owner && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-indigo-50 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-11">
                <AvatarFallback className="bg-secondary-color text-white font-semibold">
                  {getAvatar(owner.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-base-color">{owner.fullName}</p>
                <p className="text-xs text-secondbase-color">{owner.businessName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
                    <Star className="size-3 fill-amber-500" />
                    {owner.rating}
                  </span>
                  <Tag theme="success" className="bg-green-500 text-white">
                    {owner.status}
                  </Tag>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-secondbase-color">Member Since</p>
              <p className="text-sm font-medium text-base-color">{owner.memberSince}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Contact Information</p>
            <div className="grid grid-cols-2 gap-3">
              <ContactField icon={Mail} label="Email" value={owner.email} />
              <ContactField icon={Phone} label="Phone" value={owner.phone} />
              <ContactField icon={TagIcon} label="Category" value={categoryLabel[owner.category]} />
              <ContactField icon={Shield} label="Owner ID" value={owner.ownerCode} />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Performance Metrics</p>
            <div className="grid grid-cols-3 gap-3">
              <MetricBox icon={categoryIcon[owner.category]} value={String(owner.vehicleCount)} label="Vehicles" />
              <MetricBox icon={Calendar} value={String(owner.totalBookings)} label="Total Bookings" />
              <MetricBox
                icon={DollarSign}
                value={`$${owner.revenue.toLocaleString()}`}
                label="Revenue"
                valueClassName="text-emerald-600"
              />
            </div>
          </div>

          {owner.fleet.length > 0 && (
            <div>
              <p className="text-sm font-medium text-base-color mb-2">Fleet Overview</p>
              <div className="space-y-2">
                {owner.fleet.map((vehicle) => {
                  const Icon = categoryIcon[owner.category];
                  return (
                    <div
                      key={vehicle._id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-secondary-color" />
                        <div>
                          <p className="text-sm font-medium text-base-color">{vehicle.name}</p>
                          <p className="text-xs text-secondbase-color">{vehicle.bookingsCompleted} bookings</p>
                        </div>
                      </div>
                      <Tag
                        theme={vehicleStatusTheme[vehicle.status]}
                        className={vehicle.status === "active" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}
                      >
                        {vehicle.status}
                      </Tag>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </ReusableModal>
  );
};

export default OwnerDetailModal;
