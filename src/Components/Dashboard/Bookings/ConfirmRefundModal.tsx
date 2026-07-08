import { CheckCircle2 } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { ICancellation } from "@/types";

interface ConfirmRefundModalProps {
  open: boolean;
  onClose: () => void;
  cancellation: ICancellation | null;
  onConfirm: (cancellation: ICancellation) => void;
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-secondbase-color">{label}</span>
    <span className="text-sm font-medium text-base-color">{value}</span>
  </div>
);

const ConfirmRefundModal = ({ open, onClose, cancellation, onConfirm }: ConfirmRefundModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Confirm Refund"
      description="This action will process a refund to the customer's original payment method."
      maxWidth="sm:max-w-md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => cancellation && onConfirm(cancellation)}
          >
            <CheckCircle2 className="size-4" />
            Confirm Refund
          </Button>
        </div>
      }
    >
      {cancellation && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-emerald-50 p-4 space-y-2">
            <Field label="Customer" value={cancellation.customerName} />
            <Field label="Booking" value={cancellation.bookingCode} />
            <Field label="Refund Amount" value={<span className="text-emerald-600 font-semibold">${cancellation.refundAmount.toLocaleString()}</span>} />
          </div>

          <p className="text-xs text-secondbase-color">
            Refunds typically take 5-10 business days to appear on the customer's statement.
          </p>
        </div>
      )}
    </ReusableModal>
  );
};

export default ConfirmRefundModal;
