import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { ITransaction } from "@/types";

interface ProcessRefundModalProps {
  open: boolean;
  onClose: () => void;
  transaction: ITransaction | null;
  onConfirm: (transaction: ITransaction, reason: string) => void;
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-secondbase-color">{label}</span>
    <span className="text-sm font-medium text-base-color">{value}</span>
  </div>
);

const ProcessRefundModal = ({ open, onClose, transaction, onConfirm }: ProcessRefundModalProps) => {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) setReason("");
  }, [open]);

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Process Refund"
      description={transaction ? `Issue a refund for transaction ${transaction.transactionCode}` : undefined}
      maxWidth="sm:max-w-md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => transaction && onConfirm(transaction, reason)}>
            Process Refund
          </Button>
        </div>
      }
    >
      {transaction && (
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Field label="Amount" value={`$${transaction.amount.toLocaleString()}`} />
            <Field label="Customer" value={transaction.customerName} />
            <Field label="Booking" value={transaction.bookingCode} />
            <Field label="Payment Method" value={transaction.paymentMethod} />
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Reason for Refund</p>
            <Textarea
              className="border-base-color/30 bg-primary-color"
              placeholder="Enter the reason for this refund..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-start rounded-md border border-amber-300 bg-amber-50 p-3">
            <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              This will refund the full amount to the customer's original payment method. Processing may take 5-10
              business days.
            </p>
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default ProcessRefundModal;
