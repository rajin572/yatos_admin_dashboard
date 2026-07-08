import { RotateCcw } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { ICancellation } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
import { cancelledByLabel, refundStatusClass } from "./bookingDisplay";

interface CancellationDetailsModalProps {
  open: boolean;
  onClose: () => void;
  cancellation: ICancellation | null;
  onIssueRefund: (cancellation: ICancellation) => void;
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs text-secondbase-color">{label}</p>
    <p className="text-sm font-medium text-base-color mt-0.5">{value}</p>
  </div>
);

const CancellationDetailsModal = ({ open, onClose, cancellation, onIssueRefund }: CancellationDetailsModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Cancellation Details"
      description={cancellation ? `${cancellation.cancellationCode} — ${cancellation.bookingCode}` : undefined}
      maxWidth="sm:max-w-md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {cancellation?.refundStatus === "pending" && (
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => onIssueRefund(cancellation)}
            >
              <RotateCcw className="size-4" />
              Issue Refund
            </Button>
          )}
        </div>
      }
    >
      {cancellation && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-background-color p-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-secondary-color text-white font-semibold text-sm">
                  {getAvatar(cancellation.customerName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-base-color">{cancellation.customerName}</p>
                <p className="text-xs text-secondbase-color">{cancellation.ownerName}</p>
              </div>
            </div>
            <span className="inline-block rounded-md border border-border px-2 py-1 text-xs text-base-color whitespace-nowrap">
              Cancelled by {cancelledByLabel[cancellation.cancelledBy].toLowerCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Listing" value={cancellation.listingTitle} />
            <Field label="Scheduled Date" value={cancellation.scheduledDate} />
            <Field label="Cancellation Date" value={cancellation.cancellationDate} />
            <Field label="Reason" value={cancellation.reason} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-secondbase-color">Booking Amount</p>
              <p className="text-base font-bold text-base-color mt-1">${cancellation.bookingAmount.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-secondbase-color">Refund Amount</p>
              <p className="text-base font-bold text-emerald-600 mt-1">${cancellation.refundAmount.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-secondbase-color">Refund Status</p>
              <Tag theme="success" className={`${refundStatusClass[cancellation.refundStatus]} mt-1`}>
                {cancellation.refundStatus}
              </Tag>
            </div>
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default CancellationDetailsModal;
