import { useState } from "react";
import { Building2, Calendar, Download, Eye, MessageSquare, RotateCcw, User } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import BookingStatCards from "@/Components/Dashboard/Bookings/BookingStatCards";
import BookingDetailModal from "@/Components/Dashboard/Bookings/BookingDetailModal";
import ResolveDisputeModal from "@/Components/Dashboard/Bookings/ResolveDisputeModal";
import CancellationDetailsModal from "@/Components/Dashboard/Bookings/CancellationDetailsModal";
import ConfirmRefundModal from "@/Components/Dashboard/Bookings/ConfirmRefundModal";
import {
  bookingStatusClass,
  cancelledByClass,
  cancelledByLabel,
  disputePriorityClass,
  disputeStatusClass,
  refundStatusClass,
} from "@/Components/Dashboard/Bookings/bookingDisplay";
import { IBooking, ICancellation, IDispute } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";
// import {
//   useGetBookingsQuery,
//   useGetDisputesQuery,
//   useGetCancellationsQuery,
//   useResolveDisputeMutation,
//   useIssueRefundMutation,
// } from "@/redux/features/booking/bookingApi";

// TODO: replace with real bookings API data once the endpoint exists.
const DUMMY_BOOKINGS: IBooking[] = [
  { _id: "1", bookingCode: "BK-10234", customerName: "John Smith", listingTitle: "Luxury Yacht - Sunseeker 88", ownerName: "Marina Elite Ltd", dateLabel: "May 20-25, 2026", amount: 12500, status: "confirmed", createdAt: "2026-05-16 10:30 AM" },
  { _id: "2", bookingCode: "BK-10233", customerName: "Sarah Johnson", listingTitle: "Gulfstream G650 Private Jet", ownerName: "Sky Charter Services", dateLabel: "May 22, 2026", amount: 45000, status: "pending", createdAt: "2026-05-16 09:15 AM" },
  { _id: "3", bookingCode: "BK-10232", customerName: "Michael Chen", listingTitle: "Ferrari 812 Superfast", ownerName: "Premium Motors", dateLabel: "May 18-20, 2026", amount: 3200, status: "completed", createdAt: "2026-05-15 04:20 PM" },
  { _id: "4", bookingCode: "BK-10231", customerName: "Emma Davis", listingTitle: "Catamaran - Caribbean", ownerName: "Ocean Adventures", dateLabel: "May 15-22, 2026", amount: 8750, status: "disputed", createdAt: "2026-05-14 02:45 PM" },
  { _id: "5", bookingCode: "BK-10230", customerName: "David Wilson", listingTitle: "Helicopter Tour", ownerName: "Sky Tours Inc", dateLabel: "May 14, 2026", amount: 2800, status: "cancelled", createdAt: "2026-05-13 11:30 AM" },
];

// TODO: replace with real disputes API data once the endpoint exists.
const DUMMY_DISPUTES: IDispute[] = [
  {
    _id: "1", disputeCode: "DIS-001", bookingCode: "BK-10231", listingTitle: "Catamaran - Caribbean", customerName: "Emma Davis", ownerName: "Ocean Adventures",
    reason: "Equipment not as described", amount: 8750, priority: "high", status: "open", openedAt: "2026-05-16 08:00 AM",
    conversation: [{ _id: "m1", authorName: "Emma Davis", timeLabel: "2 hours ago", message: "Equipment not as described" }],
  },
  {
    _id: "2", disputeCode: "DIS-002", bookingCode: "BK-10225", listingTitle: "Private Jet Charter", customerName: "Robert Brown", ownerName: "Luxury Air Services",
    reason: "Flight delayed without notice", amount: 38000, priority: "high", status: "investigating", openedAt: "2026-05-15 02:30 PM",
    conversation: [{ _id: "m2", authorName: "Robert Brown", timeLabel: "1 day ago", message: "Flight delayed without notice" }],
  },
  {
    _id: "3", disputeCode: "DIS-003", bookingCode: "BK-10220", listingTitle: "Rolls-Royce Phantom", customerName: "Lisa Anderson", ownerName: "Premium Motors",
    reason: "Minor damage on pickup", amount: 4200, priority: "medium", status: "resolved", openedAt: "2026-05-14 10:15 AM",
    conversation: [{ _id: "m3", authorName: "Lisa Anderson", timeLabel: "2 days ago", message: "Minor damage on pickup" }],
  },
];

// TODO: replace with real cancellations API data once the endpoint exists.
const DUMMY_CANCELLATIONS: ICancellation[] = [
  { _id: "1", cancellationCode: "CAN-001", bookingCode: "BK-10230", customerName: "David Wilson", listingTitle: "Helicopter Tour", ownerName: "Sky Tours Inc", cancelledBy: "customer", cancellationDate: "May 13, 2026", scheduledDate: "May 14, 2026", reason: "Change of plans", bookingAmount: 2800, refundAmount: 1960, refundStatus: "issued" },
  { _id: "2", cancellationCode: "CAN-002", bookingCode: "BK-10218", customerName: "Sophia Martinez", listingTitle: "Luxury Yacht - Azimut 68", ownerName: "Blue Horizon Marine", cancelledBy: "owner", cancellationDate: "May 10, 2026", scheduledDate: "May 17, 2026", reason: "Vessel maintenance", bookingAmount: 9500, refundAmount: 9500, refundStatus: "issued" },
  { _id: "3", cancellationCode: "CAN-003", bookingCode: "BK-10205", customerName: "James Okafor", listingTitle: "Cessna Citation XLS", ownerName: "AirElite Charter", cancelledBy: "customer", cancellationDate: "May 8, 2026", scheduledDate: "May 15, 2026", reason: "Medical emergency", bookingAmount: 18000, refundAmount: 9000, refundStatus: "pending" },
  { _id: "4", cancellationCode: "CAN-004", bookingCode: "BK-10198", customerName: "Priya Nair", listingTitle: "Rolls-Royce Phantom", ownerName: "Premium Motors", cancelledBy: "admin", cancellationDate: "May 6, 2026", scheduledDate: "May 6, 2026", reason: "Policy violation", bookingAmount: 4800, refundAmount: 0, refundStatus: "denied" },
  { _id: "5", cancellationCode: "CAN-005", bookingCode: "BK-10187", customerName: "Lucas Ferreira", listingTitle: "Catamaran - Fountaine Pajot", ownerName: "Ocean Adventures", cancelledBy: "customer", cancellationDate: "May 2, 2026", scheduledDate: "May 20, 2026", reason: "Weather concerns", bookingAmount: 11200, refundAmount: 11200, refundStatus: "issued" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Disputed", value: "disputed" },
  { label: "Cancelled", value: "cancelled" },
];

const BookingsDisputesPage = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // const { data } = useGetBookingsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const bookings = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const bookings = DUMMY_BOOKINGS;
  const total = DUMMY_BOOKINGS.length;

  // const { data: disputesData } = useGetDisputesQuery({ page: 1, limit: 10 }, { refetchOnMountOrArgChange: true });
  // const { data: cancellationsData } = useGetCancellationsQuery({ page: 1, limit: 10 }, { refetchOnMountOrArgChange: true });
  const [disputes, setDisputes] = useState(DUMMY_DISPUTES);
  const [cancellations, setCancellations] = useState(DUMMY_CANCELLATIONS);

  const openDisputeCount = disputes.filter((d) => d.status === "open").length;

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isBookingDetailOpen, setIsBookingDetailOpen] = useState(false);

  const [selectedDispute, setSelectedDispute] = useState<IDispute | null>(null);
  const [isResolveOpen, setIsResolveOpen] = useState(false);

  const [selectedCancellation, setSelectedCancellation] = useState<ICancellation | null>(null);
  const [isCancellationDetailOpen, setIsCancellationDetailOpen] = useState(false);
  const [isConfirmRefundOpen, setIsConfirmRefundOpen] = useState(false);

  const handleExportReport = () => {
    const header = ["Booking ID", "Customer", "Listing", "Owner", "Dates", "Amount", "Status", "Created"];
    const rows = bookings.map((b) => [b.bookingCode, b.customerName, b.listingTitle, b.ownerName, b.dateLabel, b.amount, b.status, b.createdAt]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookings-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // const [resolveDispute] = useResolveDisputeMutation();
  // const [issueRefund] = useIssueRefundMutation();

  const handleResolveDispute = async (dispute: IDispute, _action: "approve" | "reject" | "partial_refund", _notes: string) => {
    // const res = await tryCatchWrapper(
    //   resolveDispute,
    //   { params: { id: dispute._id }, body: { action: _action, notes: _notes } },
    //   { toastLoadingMessage: "Resolving dispute..." }
    // );
    // if (res?.success) {
    setDisputes((prev) => prev.map((d) => (d._id === dispute._id ? { ...d, status: "resolved" } : d)));
    setIsResolveOpen(false);
    // }
  };

  const handleOpenIssueRefund = (cancellation: ICancellation) => {
    setSelectedCancellation(cancellation);
    setIsCancellationDetailOpen(false);
    setIsConfirmRefundOpen(true);
  };

  const handleConfirmRefund = async (cancellation: ICancellation) => {
    // const res = await tryCatchWrapper(
    //   issueRefund,
    //   { params: { id: cancellation._id } },
    //   { toastLoadingMessage: "Issuing refund..." }
    // );
    // if (res?.success) {
    setCancellations((prev) => prev.map((c) => (c._id === cancellation._id ? { ...c, refundStatus: "issued" } : c)));
    setIsConfirmRefundOpen(false);
    // }
  };

  const bookingColumns: Column<IBooking>[] = [
    { header: "Booking ID", accessorKey: "bookingCode" },
    {
      header: "Customer",
      accessorKey: "customerName",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarFallback className="bg-secondary-color text-white text-xs font-semibold">{getAvatar(value)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      header: "Listing",
      accessorKey: "listingTitle",
      render: (_, row) => (
        <div>
          <p className="text-sm font-medium text-base-color">{row.listingTitle}</p>
          <p className="text-xs text-secondbase-color">{row.ownerName}</p>
        </div>
      ),
    },
    {
      header: "Dates",
      accessorKey: "dateLabel",
      render: (value: string) => (
        <span className="flex items-center gap-1.5 text-sm">
          <Calendar className="size-3.5 text-secondbase-color" />
          {value}
        </span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      render: (value: number) => <span className="text-sm font-semibold text-base-color">${value.toLocaleString()}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IBooking["status"]) => (
        <Tag theme="success" className={bookingStatusClass[value]}>
          {value}
        </Tag>
      ),
    },
    { header: "Created", accessorKey: "createdAt" },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => (
        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
          onClick={() => {
            setSelectedBooking(row);
            setIsBookingDetailOpen(true);
          }}
        >
          <Eye className="size-4 text-base-color" />
        </button>
      ),
    },
  ];

  const disputeColumns: Column<IDispute>[] = [
    { header: "Dispute ID", accessorKey: "disputeCode" },
    {
      header: "Booking",
      accessorKey: "bookingCode",
      render: (value: string) => <span className="text-sm text-secondary-color">{value}</span>,
    },
    {
      header: "Parties",
      accessorKey: "customerName",
      render: (_, row) => (
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-xs text-base-color">
            <User className="size-3" />
            {row.customerName}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-secondbase-color">
            <Building2 className="size-3" />
            {row.ownerName}
          </p>
        </div>
      ),
    },
    {
      header: "Reason",
      accessorKey: "reason",
      cellClassName: "max-w-48",
      render: (value: string) => <span className="text-sm text-secondbase-color line-clamp-1">{value}</span>,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      render: (value: number) => <span className="text-sm font-semibold text-base-color">${value.toLocaleString()}</span>,
    },
    {
      header: "Priority",
      accessorKey: "priority",
      render: (value: IDispute["priority"]) => (
        <Tag theme="success" className={disputePriorityClass[value]}>
          {value}
        </Tag>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IDispute["status"]) => (
        <Tag theme="success" className={disputeStatusClass[value]}>
          {value}
        </Tag>
      ),
    },
    { header: "Opened", accessorKey: "openedAt" },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setSelectedDispute(row);
            setIsResolveOpen(true);
          }}
        >
          <MessageSquare className="size-4" />
          Resolve
        </Button>
      ),
    },
  ];

  const cancellationColumns: Column<ICancellation>[] = [
    { header: "ID", accessorKey: "cancellationCode" },
    {
      header: "Booking",
      accessorKey: "bookingCode",
      render: (value: string) => <span className="text-sm text-secondary-color">{value}</span>,
    },
    {
      header: "Customer",
      accessorKey: "customerName",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarFallback className="bg-secondary-color text-white text-xs font-semibold">{getAvatar(value)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      header: "Listing",
      accessorKey: "listingTitle",
      render: (_, row) => (
        <div>
          <p className="text-sm font-medium text-base-color">{row.listingTitle}</p>
          <p className="text-xs text-secondbase-color">{row.ownerName}</p>
        </div>
      ),
    },
    {
      header: "Cancelled By",
      accessorKey: "cancelledBy",
      render: (value: ICancellation["cancelledBy"]) => (
        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${cancelledByClass[value]}`}>
          <User className="size-3" />
          {cancelledByLabel[value]}
        </span>
      ),
    },
    { header: "Cancellation Date", accessorKey: "cancellationDate" },
    {
      header: "Booking Amount",
      accessorKey: "bookingAmount",
      render: (value: number) => <span className="text-sm font-medium">${value.toLocaleString()}</span>,
    },
    {
      header: "Refund",
      accessorKey: "refundAmount",
      render: (value: number) => <span className="text-sm font-medium text-emerald-600">${value.toLocaleString()}</span>,
    },
    {
      header: "Refund Status",
      accessorKey: "refundStatus",
      render: (value: ICancellation["refundStatus"]) => (
        <Tag theme="success" className={refundStatusClass[value]}>
          {value}
        </Tag>
      ),
    },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              setSelectedCancellation(row);
              setIsCancellationDetailOpen(true);
            }}
          >
            <Eye className="size-4 text-base-color" />
          </button>
          {row.refundStatus === "pending" && (
            <button
              type="button"
              className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
              onClick={() => handleOpenIssueRefund(row)}
            >
              <RotateCcw className="size-4 text-emerald-500" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageWraper
      title="Bookings & Disputes"
      description="Manage bookings, cancellations, and dispute resolution"
      actions={
        <Button variant="secondary" onClick={handleExportReport}>
          <Download className="size-4" />
          Export Report
        </Button>
      }
    >
      <BookingStatCards />

      <ReuseTabs
        options={[
          { label: "All Bookings", value: "bookings" },
          { label: "Disputes", value: "disputes", badge: openDisputeCount },
          { label: "Cancellations", value: "cancellations" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "bookings" && (
        <div className="bg-white rounded-xl border border-border shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
            <h2 className="text-base font-semibold text-base-color">All Bookings</h2>
            <div className="flex flex-wrap items-center gap-3">
              <ReuseSearchInput className="min-w-56" placeholder="Search bookings..." setSearch={setSearch} setPage={setCurrentPage} />
              <ReuseFilterSelect
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
                placeholder="All Status"
              />
            </div>
          </div>

          <ReusableTable
            data={bookings}
            columns={bookingColumns}
            pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            total={total}
          />
        </div>
      )}

      {activeTab === "disputes" && (
        <div className="bg-white rounded-xl border border-border shadow-sm">
          <div className="p-5 pb-4">
            <h2 className="text-base font-semibold text-base-color">Active Disputes</h2>
            <p className="text-sm text-secondbase-color">Resolve customer disputes and conflicts</p>
          </div>
          <ReusableTable data={disputes} columns={disputeColumns} />
        </div>
      )}

      {activeTab === "cancellations" && (
        <div className="bg-white rounded-xl border border-border shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
            <div>
              <h2 className="text-base font-semibold text-base-color">Cancellations</h2>
              <p className="text-sm text-secondbase-color">Booking cancellations and refund status across all categories</p>
            </div>
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>
          </div>
          <ReusableTable data={cancellations} columns={cancellationColumns} />
        </div>
      )}

      <BookingDetailModal open={isBookingDetailOpen} onClose={() => setIsBookingDetailOpen(false)} booking={selectedBooking} />
      <ResolveDisputeModal
        open={isResolveOpen}
        onClose={() => setIsResolveOpen(false)}
        dispute={selectedDispute}
        onResolve={handleResolveDispute}
      />
      <CancellationDetailsModal
        open={isCancellationDetailOpen}
        onClose={() => setIsCancellationDetailOpen(false)}
        cancellation={selectedCancellation}
        onIssueRefund={handleOpenIssueRefund}
      />
      <ConfirmRefundModal
        open={isConfirmRefundOpen}
        onClose={() => setIsConfirmRefundOpen(false)}
        cancellation={selectedCancellation}
        onConfirm={handleConfirmRefund}
      />
    </PageWraper>
  );
};

export default BookingsDisputesPage;
