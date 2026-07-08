import { useEffect, useState } from "react";
import { Ban, CheckCircle2, DollarSign } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { IDispute } from "@/types";
import { getAvatar } from "@/utils/getAvatar";

interface ResolveDisputeModalProps {
  open: boolean;
  onClose: () => void;
  dispute: IDispute | null;
  onResolve: (dispute: IDispute, action: "approve" | "reject" | "partial_refund", notes: string) => void;
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs text-secondbase-color">{label}</p>
    <p className="text-sm font-medium text-base-color mt-0.5">{value}</p>
  </div>
);

const ResolveDisputeModal = ({ open, onClose, dispute, onResolve }: ResolveDisputeModalProps) => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) setNotes("");
  }, [open]);

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Resolve Dispute"
      description={dispute ? `${dispute.disputeCode} - ${dispute.listingTitle}` : undefined}
      maxWidth="sm:max-w-lg"
      footer={
        dispute && (
          <div className="flex flex-wrap justify-end gap-2 w-full">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/90 text-white"
              onClick={() => onResolve(dispute, "reject", notes)}
            >
              <Ban className="size-4" />
              Reject
            </Button>
            <Button variant="secondary" onClick={() => onResolve(dispute, "partial_refund", notes)}>
              <DollarSign className="size-4" />
              Partial Refund
            </Button>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => onResolve(dispute, "approve", notes)}
            >
              <CheckCircle2 className="size-4" />
              Approve
            </Button>
          </div>
        )
      }
    >
      {dispute && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-background-color p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Customer" value={dispute.customerName} />
              <Field label="Owner" value={dispute.ownerName} />
              <Field label="Booking ID" value={dispute.bookingCode} />
              <Field label="Amount" value={`$${dispute.amount.toLocaleString()}`} />
            </div>
            <Field label="Reason" value={dispute.reason} />
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Conversation</p>
            <div className="rounded-lg border border-border p-3 space-y-2">
              {dispute.conversation.map((message) => (
                <div key={message._id} className="flex gap-2">
                  <Avatar className="size-7 shrink-0">
                    <AvatarFallback className="bg-secondary-color text-white text-[10px] font-semibold">
                      {getAvatar(message.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium text-base-color">
                      {message.authorName} <span className="text-secondbase-color font-normal">{message.timeLabel}</span>
                    </p>
                    <p className="text-sm text-base-color mt-0.5">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Resolution Notes</p>
            <Textarea
              className="border-base-color/30 bg-primary-color"
              placeholder="Enter your resolution decision and notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default ResolveDisputeModal;
