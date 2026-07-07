import { useState } from "react";
import { Download, Eye, FileText, MoreVertical, Star } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import OwnerStatCards from "@/Components/Dashboard/OwnerManagement/OwnerStatCards";
import DocumentVerificationModal from "@/Components/Dashboard/OwnerManagement/DocumentVerificationModal";
import OwnerDetailModal from "@/Components/Dashboard/OwnerManagement/OwnerDetailModal";
import ManageVehiclesModal from "@/Components/Dashboard/OwnerManagement/ManageVehiclesModal";
import BookingHistoryModal from "@/Components/Dashboard/OwnerManagement/BookingHistoryModal";
import { IOwner, IVerificationDocument } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
import { categoryIcon, categoryLabel, vehicleCountLabel } from "@/utils/categoryDisplay";
// import { useGetVerificationQueueQuery, useGetOwnersQuery, useVerifyDocumentMutation, useSuspendOwnerMutation } from "@/redux/features/owner/ownerApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real verification-queue API data once the endpoint exists.
const DUMMY_VERIFICATION_QUEUE: IVerificationDocument[] = [
  { _id: "1", verificationCode: "VER-001", ownerName: "Marina Elite Ltd", businessName: "Luxury Yacht Rentals", documentType: "Business License", category: "boat", submittedAt: "2026-05-16 10:30 AM", status: "pending" },
  { _id: "2", verificationCode: "VER-001", ownerName: "Marina Elite Ltd", businessName: "Luxury Yacht Rentals", documentType: "Business License", category: "boat", submittedAt: "2026-05-16 10:30 AM", status: "under_review" },
  { _id: "3", verificationCode: "VER-001", ownerName: "Marina Elite Ltd", businessName: "Luxury Yacht Rentals", documentType: "Business License", category: "boat", submittedAt: "2026-05-16 10:30 AM", status: "pending" },
  { _id: "4", verificationCode: "VER-001", ownerName: "Marina Elite Ltd", businessName: "Luxury Yacht Rentals", documentType: "Business License", category: "boat", submittedAt: "2026-05-16 10:30 AM", status: "pending" },
];

// TODO: replace with real owners API data once the endpoint exists.
const DUMMY_OWNERS: IOwner[] = [
  {
    _id: "1", ownerCode: "OWN-001", fullName: "Michael Thompson", businessName: "Prestige Yacht Rentals",
    email: "michael@prestigeyachts.com", phone: "+1 555-0123", category: "boat", rating: 4.9,
    vehicleCount: 3, totalBookings: 115, revenue: 287500, memberSince: "Jan 2024", status: "active",
    fleet: [
      { _id: "v1", name: "Azimut 72 Flybridge", bookingsCompleted: 45, status: "active" },
      { _id: "v2", name: "Sunseeker Predator 68", bookingsCompleted: 38, status: "active" },
      { _id: "v3", name: "Princess V78", bookingsCompleted: 32, status: "maintenance" },
    ],
    bookings: [
      { _id: "b1", bookingCode: "BK-1234", vehicleName: "Azimut 72 Flybridge", customerName: "John Smith", date: "May 15, 2026", amount: 2500, status: "completed" },
      { _id: "b2", bookingCode: "BK-1235", vehicleName: "Sunseeker Predator 68", customerName: "Emma Wilson", date: "May 12, 2026", amount: 3200, status: "completed" },
      { _id: "b3", bookingCode: "BK-1236", vehicleName: "Azimut 72 Flybridge", customerName: "Michael Brown", date: "May 10, 2026", amount: 1800, status: "completed" },
      { _id: "b4", bookingCode: "BK-1237", vehicleName: "Princess V78", customerName: "Sarah Davis", date: "May 22, 2026", amount: 4100, status: "upcoming" },
    ],
  },
  { _id: "2", ownerCode: "OWN-002", fullName: "Sarah Williams", businessName: "Elite Aviation Charter", email: "sarah@eliteaviation.com", phone: "+1 555-0124", category: "air", rating: 5, vehicleCount: 2, totalBookings: 119, revenue: 892000, memberSince: "Feb 2024", status: "active", fleet: [], bookings: [] },
  { _id: "3", ownerCode: "OWN-003", fullName: "Roberto Ferrari", businessName: "Mediterranean Luxury Fleet", email: "roberto@medluxury.it", phone: "+1 555-0125", category: "boat", rating: 4.8, vehicleCount: 4, totalBookings: 131, revenue: 425300, memberSince: "Dec 2023", status: "active", fleet: [], bookings: [] },
  { _id: "4", ownerCode: "OWN-004", fullName: "James Anderson", businessName: "SkyLux Private Jets", email: "james@skylux.com", phone: "+1 555-0126", category: "air", rating: 4.7, vehicleCount: 3, totalBookings: 145, revenue: 678900, memberSince: "Mar 2024", status: "active", fleet: [], bookings: [] },
  { _id: "5", ownerCode: "OWN-005", fullName: "Isabella Costa", businessName: "Atlantic Yacht Collection", email: "isabella@atlanticyacht.com", phone: "+1 555-0127", category: "boat", rating: 4.9, vehicleCount: 2, totalBookings: 82, revenue: 312400, memberSince: "Apr 2024", status: "active", fleet: [], bookings: [] },
];

const docStatusClass: Record<IVerificationDocument["status"], string> = {
  pending: "bg-indigo-400 text-white",
  under_review: "bg-blue-500 text-white",
};

const OwnerManagementPage = () => {
  const [activeTab, setActiveTab] = useState("queue");

  // const { data: queueData } = useGetVerificationQueueQuery({ page: 1, limit: 10 }, { refetchOnMountOrArgChange: true });
  // const verificationQueueFromApi = queueData?.data?.data ?? [];
  // const { data: ownersData } = useGetOwnersQuery({ page: 1, limit: 10 }, { refetchOnMountOrArgChange: true });
  // const ownersFromApi = ownersData?.data?.data ?? [];
  const [verificationQueue, setVerificationQueue] = useState(DUMMY_VERIFICATION_QUEUE);
  const [owners, setOwners] = useState(DUMMY_OWNERS);

  const [selectedDoc, setSelectedDoc] = useState<IVerificationDocument | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  const [selectedOwner, setSelectedOwner] = useState<IOwner | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isVehiclesOpen, setIsVehiclesOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);

  const handleReview = (doc: IVerificationDocument) => {
    setSelectedDoc(doc);
    setIsDocModalOpen(true);
  };

  // const [verifyDocument] = useVerifyDocumentMutation();
  // const [suspendOwner] = useSuspendOwnerMutation();

  const handleApproveDoc = async (doc: IVerificationDocument, _notes: string) => {
    // const res = await tryCatchWrapper(
    //   verifyDocument,
    //   { params: { id: doc._id }, body: { status: "approved", notes: _notes } },
    //   { toastLoadingMessage: "Approving document..." }
    // );
    // if (res?.success) {
    //   setVerificationQueue((prev) => prev.filter((d) => d._id !== doc._id));
    //   setIsDocModalOpen(false);
    // }
    setVerificationQueue((prev) => prev.filter((d) => d._id !== doc._id));
    setIsDocModalOpen(false);
  };

  const handleRejectDoc = async (doc: IVerificationDocument, _notes: string) => {
    // const res = await tryCatchWrapper(
    //   verifyDocument,
    //   { params: { id: doc._id }, body: { status: "rejected", notes: _notes } },
    //   { toastLoadingMessage: "Rejecting document..." }
    // );
    // if (res?.success) {
    //   setVerificationQueue((prev) => prev.filter((d) => d._id !== doc._id));
    //   setIsDocModalOpen(false);
    // }
    setVerificationQueue((prev) => prev.filter((d) => d._id !== doc._id));
    setIsDocModalOpen(false);
  };

  const handleSuspendOwner = async (owner: IOwner, _reason?: string) => {
    // const res = await tryCatchWrapper(
    //   suspendOwner,
    //   { params: { id: owner._id }, body: { reason: _reason } },
    //   { toastLoadingMessage: "Suspending owner..." }
    // );
    // if (res?.success) {
    //   setOwners((prev) => prev.filter((o) => o._id !== owner._id));
    //   setIsSuspendOpen(false);
    // }
    setOwners((prev) => prev.filter((o) => o._id !== owner._id));
    setIsSuspendOpen(false);
  };

  const queueColumns: Column<IVerificationDocument>[] = [
    {
      header: "Owner",
      accessorKey: "ownerName",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-secondary-color text-white font-semibold text-xs">
              {getAvatar(row.ownerName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-base-color">{row.ownerName}</p>
            <p className="text-xs text-secondbase-color">{row.verificationCode}</p>
          </div>
        </div>
      ),
    },
    { header: "Business", accessorKey: "businessName" },
    {
      header: "Document Type",
      accessorKey: "documentType",
      render: (value: string) => (
        <span className="flex items-center gap-1.5 text-sm">
          <FileText className="size-4 text-secondbase-color" />
          {value}
        </span>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      render: (value: string) => (
        <span className="inline-block rounded-md border border-border px-2 py-0.5 text-xs text-base-color">
          {value}
        </span>
      ),
    },
    { header: "Submitted", accessorKey: "submittedAt" },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IVerificationDocument["status"]) => (
        <Tag theme="blue" className={docStatusClass[value]}>
          {value === "under_review" ? "Under Review" : "Pending"}
        </Tag>
      ),
    },
    {
      header: "Action",
      accessorKey: "_id",
      render: (_, row) => (
        <Button variant="secondary" size="sm" onClick={() => handleReview(row)}>
          <Eye className="size-4" />
          Review
        </Button>
      ),
    },
  ];

  const ownerColumns: Column<IOwner>[] = [
    {
      header: "Owner",
      accessorKey: "fullName",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-secondary-color text-white font-semibold text-xs">
              {getAvatar(row.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-base-color">{row.fullName}</p>
            <p className="text-xs text-secondbase-color">{row.ownerCode}</p>
            <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
              <Star className="size-3 fill-amber-500" />
              {row.rating}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Business Name",
      accessorKey: "businessName",
      render: (_, row) => (
        <div>
          <p className="text-sm text-base-color">{row.businessName}</p>
          <p className="text-xs text-secondbase-color">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      render: (value: IOwner["category"]) => {
        const Icon = categoryIcon[value];
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-base-color">
            <Icon className="size-3.5" />
            {categoryLabel[value]}
          </span>
        );
      },
    },
    {
      header: "Vehicles",
      accessorKey: "vehicleCount",
      render: (_, row) => <span className="text-sm">{vehicleCountLabel(row.category, row.vehicleCount)}</span>,
    },
    {
      header: "Total Bookings",
      accessorKey: "totalBookings",
      render: (value: number) => <span className="text-sm">{value}</span>,
    },
    {
      header: "Revenue",
      accessorKey: "revenue",
      render: (value: number) => <span className="text-sm font-medium text-emerald-600">${value.toLocaleString()}</span>,
    },
    { header: "Member Since", accessorKey: "memberSince" },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IOwner["status"]) => (
        <Tag theme="success" className="bg-green-500 text-white">
          {value}
        </Tag>
      ),
    },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer">
              <MoreVertical className="size-4 text-base-color" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedOwner(row);
                setIsDetailOpen(true);
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedOwner(row);
                setIsVehiclesOpen(true);
              }}
            >
              Manage Vehicles
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedOwner(row);
                setIsBookingsOpen(true);
              }}
            >
              View Bookings
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setSelectedOwner(row);
                setIsSuspendOpen(true);
              }}
            >
              Suspend Owner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <PageWraper title="Owner Management" description="Manage owner verifications, documents, and partnerships">
      <OwnerStatCards />

      <ReuseTabs
        options={[
          { label: "Verification Queue", value: "queue" },
          { label: "Verified Owners", value: "verified" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "queue" ? (
        <div className="bg-white rounded-xl border border-border shadow-sm">
          <div className="p-5 pb-4">
            <h2 className="text-base font-semibold text-base-color">Verification Queue</h2>
            <p className="text-sm text-secondary-color">{verificationQueue.length} documents pending review</p>
          </div>
          <ReusableTable data={verificationQueue} columns={queueColumns} />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
            <div>
              <h2 className="text-base font-semibold text-base-color">Verified Owners</h2>
              <p className="text-sm text-secondbase-color">All approved and active owner accounts</p>
            </div>
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>
          </div>
          <ReusableTable data={owners} columns={ownerColumns} />
        </div>
      )}

      <DocumentVerificationModal
        open={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        document={selectedDoc}
        onApprove={handleApproveDoc}
        onReject={handleRejectDoc}
      />

      <OwnerDetailModal open={isDetailOpen} onClose={() => setIsDetailOpen(false)} owner={selectedOwner} />
      <ManageVehiclesModal open={isVehiclesOpen} onClose={() => setIsVehiclesOpen(false)} owner={selectedOwner} />
      <BookingHistoryModal open={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} owner={selectedOwner} />

      <ConfirmModal<IOwner>
        open={isSuspendOpen}
        onCancel={() => setIsSuspendOpen(false)}
        currentRecord={selectedOwner}
        onConfirm={handleSuspendOwner}
        title="Suspend Owner Account"
        description="Are you sure you want to suspend this owner account?"
        confirmText="Confirm Suspension"
        cancelText="Cancel"
        variant="danger"
        warningText={
          selectedOwner && (
            <>
              <p className="font-semibold">Warning</p>
              <p>Suspending {selectedOwner.fullName} will:</p>
              <p>Deactivate all {selectedOwner.vehicleCount} vehicles</p>
              <p>Cancel all upcoming bookings</p>
              <p>Prevent new bookings</p>
              <p>Notify the owner via email</p>
            </>
          )
        }
        withReason
        reasonLabel="Reason for Suspension"
        reasonRequired
      />
    </PageWraper>
  );
};

export default OwnerManagementPage;
