import { useState } from "react";
import { Ban, CheckCircle2, Download, Eye, Mail, MoreVertical, UserX, XCircle } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import UserStatCards from "@/Components/Dashboard/UserManagement/UserStatCards";
import UserDetailModal from "@/Components/Dashboard/UserManagement/UserDetailModal";
import { statusBadgeClass, statusTheme } from "@/Components/Dashboard/UserManagement/userStatusStyles";
import { IPlatformUser, UserStatus } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
// import { useGetUsersQuery, useSuspendUserMutation, useBanUserMutation } from "@/redux/features/user/userApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real user list API data once the endpoint exists.
const DUMMY_USERS: IPlatformUser[] = [
  { _id: "1", userCode: "USR-10001", fullName: "John Smith", email: "john.smith@example.com", phone: "+1 555-0101", country: "United States", status: "active", isVerified: true, totalBookings: 12, totalSpent: 45670, lastActiveLabel: "2 hours ago", joinedAt: "2025-01-15" },
  { _id: "2", userCode: "USR-10002", fullName: "Sarah Johnson", email: "sarah.j@example.com", phone: "+44 20 1234 5678", country: "United Kingdom", status: "active", isVerified: true, totalBookings: 8, totalSpent: 32100, lastActiveLabel: "5 hours ago", joinedAt: "2025-02-03" },
  { _id: "3", userCode: "USR-10003", fullName: "Michael Chen", email: "mchen@example.com", phone: "+86 138 0000 0000", country: "China", status: "suspended", isVerified: true, totalBookings: 15, totalSpent: 58200, lastActiveLabel: "1 day ago", joinedAt: "2024-11-20" },
  { _id: "4", userCode: "USR-10004", fullName: "Emma Davis", email: "emma.davis@example.com", phone: "+61 2 1234 5678", country: "Australia", status: "active", isVerified: false, totalBookings: 2, totalSpent: 8900, lastActiveLabel: "3 days ago", joinedAt: "2025-05-10" },
  { _id: "5", userCode: "USR-10005", fullName: "David Wilson", email: "dwilson@example.com", phone: "+33 1 23 45 67 89", country: "France", status: "banned", isVerified: true, totalBookings: 7, totalSpent: 21450, lastActiveLabel: "2 weeks ago", joinedAt: "2024-09-02" },
  { _id: "6", userCode: "USR-10006", fullName: "Maria Garcia", email: "maria.garcia@example.com", phone: "+34 91 123 4567", country: "Spain", status: "active", isVerified: true, totalBookings: 18, totalSpent: 67800, lastActiveLabel: "30 minutes ago", joinedAt: "2024-08-18" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
  { label: "Banned", value: "banned" },
];

const UserManagementPage = () => {
  const [, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [selectedUser, setSelectedUser] = useState<IPlatformUser | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [isBanOpen, setIsBanOpen] = useState(false);

  // const { data } = useGetUsersQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const users = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const users = DUMMY_USERS;
  const total = DUMMY_USERS.length;

  const handleViewDetails = (user: IPlatformUser) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const handleSendEmail = (user: IPlatformUser) => {
    window.location.href = `mailto:${user.email}`;
  };

  // const [suspendUser] = useSuspendUserMutation();
  // const [banUser] = useBanUserMutation();

  const handleSuspend = async (_user: IPlatformUser, _reason?: string) => {
    // const res = await tryCatchWrapper(
    //   suspendUser,
    //   { params: { id: _user._id }, body: { reason: _reason } },
    //   { toastLoadingMessage: "Suspending user..." }
    // );
    // if (res?.success) {
    //   setIsSuspendOpen(false);
    // }
    setIsSuspendOpen(false);
  };

  const handleBan = async (_user: IPlatformUser, _reason?: string) => {
    // const res = await tryCatchWrapper(
    //   banUser,
    //   { params: { id: _user._id }, body: { reason: _reason } },
    //   { toastLoadingMessage: "Banning user..." }
    // );
    // if (res?.success) {
    //   setIsBanOpen(false);
    // }
    setIsBanOpen(false);
  };

  const handleExport = () => {
    const header = ["User ID", "Name", "Email", "Phone", "Country", "Status", "Verified", "Bookings", "Total Spent", "Last Active"];
    const rows = users.map((u) => [
      u.userCode,
      u.fullName,
      u.email,
      u.phone,
      u.country,
      u.status,
      u.isVerified ? "Yes" : "No",
      u.totalBookings,
      u.totalSpent,
      u.lastActiveLabel,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<IPlatformUser>[] = [
    {
      header: "User",
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
            <p className="text-xs text-secondbase-color">{row.userCode}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "email",
      render: (_, row) => (
        <div>
          <p className="text-sm text-base-color">{row.email}</p>
          <p className="text-xs text-secondbase-color">{row.phone}</p>
        </div>
      ),
    },
    {
      header: "Country",
      accessorKey: "country",
      render: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: UserStatus) => (
        <Tag theme={statusTheme[value]} className={statusBadgeClass[value]}>
          {value}
        </Tag>
      ),
    },
    {
      header: "Verified",
      accessorKey: "isVerified",
      render: (value: boolean) =>
        value ? (
          <CheckCircle2 className="size-4 text-emerald-500" />
        ) : (
          <XCircle className="size-4 text-muted-foreground" />
        ),
    },
    {
      header: "Bookings",
      accessorKey: "totalBookings",
      render: (value: number) => <span className="text-sm">{value}</span>,
    },
    {
      header: "Total Spent",
      accessorKey: "totalSpent",
      render: (value: number) => <span className="text-sm font-medium">${value.toLocaleString()}</span>,
    },
    {
      header: "Last Active",
      accessorKey: "lastActiveLabel",
      render: (value: string) => <span className="text-xs text-secondbase-color">{value}</span>,
    },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            >
              <MoreVertical className="size-4 text-base-color" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewDetails(row)}>
              <Eye className="size-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSendEmail(row)}>
              <Mail className="size-4" /> Send Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row);
                setIsSuspendOpen(true);
              }}
            >
              <Ban className="size-4" /> Suspend User
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setSelectedUser(row);
                setIsBanOpen(true);
              }}
            >
              <UserX className="size-4" /> Ban User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <PageWraper
      title="User Management"
      description="Manage and monitor all platform users"
      actions={
        <Button variant="outline" onClick={handleExport}>
          <Download className="size-4" />
          Export
        </Button>
      }
    >
      <UserStatCards />

      <div className="bg-white rounded-xl border border-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
          <h2 className="text-base font-semibold text-base-color">All Users</h2>
          <div className="flex flex-wrap items-center gap-3">
            <ReuseSearchInput
              className="min-w-72"
              placeholder="Search by name, email, or ID..."
              setSearch={setSearch}
              setPage={setCurrentPage}
            />
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
          data={users}
          columns={columns}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={total}
        />
      </div>

      <UserDetailModal open={isDetailOpen} onClose={() => setIsDetailOpen(false)} user={selectedUser} />

      <ConfirmModal<IPlatformUser>
        open={isSuspendOpen}
        onCancel={() => setIsSuspendOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleSuspend}
        title="Suspend User"
        description={`Temporarily suspend ${selectedUser?.fullName} from the platform`}
        confirmText="Suspend User"
        cancelText="Cancel"
        variant="warning"
        withReason
        reasonLabel="Reason for Suspension"
        reasonRequired
      />

      <ConfirmModal<IPlatformUser>
        open={isBanOpen}
        onCancel={() => setIsBanOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleBan}
        title="Ban User"
        description={`Permanently ban ${selectedUser?.fullName} from the platform`}
        confirmText="Ban User"
        cancelText="Cancel"
        variant="danger"
        warningText="This action is permanent and cannot be undone. The user will lose access to all their bookings and listings."
        withReason
        reasonLabel="Reason for Ban"
        reasonRequired
      />
    </PageWraper>
  );
};

export default UserManagementPage;
