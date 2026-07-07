import { Download, Star } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IOwner, IOwnerBooking } from "@/types";

interface BookingHistoryModalProps {
  open: boolean;
  onClose: () => void;
  owner: IOwner | null;
}

const bookingStatusClass: Record<IOwnerBooking["status"], string> = {
  completed: "bg-green-500 text-white",
  upcoming: "bg-blue-500 text-white",
};

const BookingHistoryModal = ({ open, onClose, owner }: BookingHistoryModalProps) => {
  const handleExport = () => {
    if (!owner) return;
    const header = ["Booking ID", "Vehicle", "Customer", "Date", "Amount", "Status"];
    const rows = owner.bookings.map((b) => [b.bookingCode, b.vehicleName, b.customerName, b.date, b.amount, b.status]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "booking-history.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<IOwnerBooking>[] = [
    { header: "Booking ID", accessorKey: "bookingCode" },
    { header: "Vehicle", accessorKey: "vehicleName" },
    { header: "Customer", accessorKey: "customerName" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Amount",
      accessorKey: "amount",
      render: (value: number) => <span className="text-emerald-600 font-medium">${value.toLocaleString()}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IOwnerBooking["status"]) => (
        <Tag theme={value === "completed" ? "success" : "blue"} className={bookingStatusClass[value]}>
          {value}
        </Tag>
      ),
    },
  ];

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Booking History"
      description={owner ? `All bookings for ${owner.businessName}` : undefined}
      maxWidth="sm:max-w-2xl lg:max-w-3xl"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleExport}>
            <Download className="size-4" />
            Export Report
          </Button>
        </div>
      }
    >
      {owner && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-secondbase-color">Total Bookings</p>
              <p className="text-lg font-bold text-base-color">{owner.totalBookings}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-secondbase-color">Total Revenue</p>
              <p className="text-lg font-bold text-emerald-600">${owner.revenue.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-secondbase-color">Average Rating</p>
              <p className="text-lg font-bold text-base-color flex items-center gap-1">
                <Star className="size-4 fill-amber-500 text-amber-500" />
                {owner.rating}
              </p>
            </div>
          </div>

          <ReusableTable data={owner.bookings} columns={columns} scroll={false} />
        </div>
      )}
    </ReusableModal>
  );
};

export default BookingHistoryModal;
