import { Pencil, Plus } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IOwner } from "@/types";
import { categoryIcon, vehicleCountLabel } from "@/utils/categoryDisplay";

interface ManageVehiclesModalProps {
  open: boolean;
  onClose: () => void;
  owner: IOwner | null;
}

const ManageVehiclesModal = ({ open, onClose, owner }: ManageVehiclesModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Manage Vehicles"
      description={owner ? `${owner.businessName} - Fleet Management` : undefined}
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
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-secondbase-color">{vehicleCountLabel(owner.category, owner.vehicleCount)} in fleet</p>
            <Button variant="secondary" size="sm">
              <Plus className="size-4" />
              Add Vehicle
            </Button>
          </div>

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
                      <p className="text-xs text-secondbase-color">{vehicle.bookingsCompleted} bookings completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag
                      theme={vehicle.status === "active" ? "success" : "warning"}
                      className={vehicle.status === "active" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}
                    >
                      {vehicle.status}
                    </Tag>
                    <Button variant="outline" size="sm">
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default ManageVehiclesModal;
