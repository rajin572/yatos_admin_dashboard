import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IBooking } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
import { bookingStatusClass } from "./bookingDisplay";

interface BookingDetailModalProps {
  open: boolean;
  onClose: () => void;
  booking: IBooking | null;
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs text-secondbase-color">{label}</p>
    <p className="text-sm font-medium text-base-color mt-0.5">{value}</p>
  </div>
);

const BookingDetailModal = ({ open, onClose, booking }: BookingDetailModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Booking Details"
      description={booking ? booking.bookingCode : undefined}
      maxWidth="sm:max-w-md"
      footer={
        <div className="flex justify-end w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      {booking && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-background-color p-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-secondary-color text-white font-semibold text-sm">
                  {getAvatar(booking.customerName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-base-color">{booking.customerName}</p>
                <p className="text-xs text-secondbase-color">{booking.listingTitle}</p>
              </div>
            </div>
            <Tag theme="success" className={bookingStatusClass[booking.status]}>
              {booking.status}
            </Tag>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Owner" value={booking.ownerName} />
            <Field label="Dates" value={booking.dateLabel} />
            <Field label="Amount" value={`$${booking.amount.toLocaleString()}`} />
            <Field label="Created" value={booking.createdAt} />
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default BookingDetailModal;
