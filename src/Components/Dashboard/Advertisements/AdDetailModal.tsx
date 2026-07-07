import { Pencil } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IAdvertisement } from "@/types";
import { placementLabel, statusBadgeClass } from "./adDisplay";

interface AdDetailModalProps {
  open: boolean;
  onClose: () => void;
  ad: IAdvertisement | null;
  onEdit: (ad: IAdvertisement) => void;
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs text-secondbase-color">{label}</p>
    <p className="text-sm font-medium text-base-color mt-0.5">{value}</p>
  </div>
);

const AdDetailModal = ({ open, onClose, ad, onEdit }: AdDetailModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Ad Details"
      description={ad ? ad.adCode : undefined}
      maxWidth="sm:max-w-md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => ad && onEdit(ad)}>
            <Pencil className="size-4" />
            Edit Ad
          </Button>
        </div>
      }
    >
      {ad && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-base-color">{ad.name}</h3>
            <Tag theme="success" className={statusBadgeClass[ad.status]}>
              {ad.status}
            </Tag>
          </div>

          <span className="inline-block w-fit rounded-md border border-border px-2 py-1 text-xs text-base-color">
            {placementLabel[ad.placement]}
          </span>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date" value={ad.startDate} />
            <Field label="End Date" value={ad.endDate} />
            <Field label="Status" value={<span className="capitalize">{ad.status}</span>} />
            <Field label="Impressions" value={ad.impressions.toLocaleString()} />
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Performance</p>
            <div className="rounded-lg border border-border p-3">
              <p className="text-lg font-bold text-secondary-color">{ad.impressions.toLocaleString()}</p>
              <p className="text-xs text-secondbase-color">Impressions this period</p>
            </div>
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default AdDetailModal;
