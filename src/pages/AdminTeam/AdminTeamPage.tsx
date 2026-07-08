import { useState } from "react";
import { CircleCheck, Pencil, Trash2, UserPlus, XCircle } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import AdminTeamStatCards from "@/Components/Dashboard/AdminTeam/AdminTeamStatCards";
import AdminFormModal from "@/Components/Dashboard/AdminTeam/AdminFormModal";
import RolesPermissionsPanel from "@/Components/Dashboard/AdminTeam/RolesPermissionsPanel";
import AuditLogTab from "@/Components/Dashboard/AdminTeam/AuditLogTab";
import { AdminMemberStatus, IAdminTeamMember } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
// import {
//   useGetAdminTeamMembersQuery,
//   useInviteAdminMutation,
//   useUpdateAdminMutation,
//   useRemoveAdminMutation,
// } from "@/redux/features/adminTeam/adminTeamApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real admin-team list API data once the endpoint exists.
const DUMMY_ADMINS: IAdminTeamMember[] = [
  { _id: "1", adminCode: "ADM-001", fullName: "Sarah Johnson", email: "sarah.j@yatos.com", role: "Super Admin", status: "active", twoFactorEnabled: true, lastActiveLabel: "5 minutes ago" },
  { _id: "2", adminCode: "ADM-002", fullName: "Michael Chen", email: "michael.c@yatos.com", role: "Admin", status: "active", twoFactorEnabled: true, lastActiveLabel: "2 hours ago" },
  { _id: "3", adminCode: "ADM-003", fullName: "Emma Davis", email: "emma.d@yatos.com", role: "Moderator", status: "active", twoFactorEnabled: false, lastActiveLabel: "1 day ago" },
  { _id: "4", adminCode: "ADM-004", fullName: "David Wilson", email: "david.w@yatos.com", role: "Support", status: "inactive", twoFactorEnabled: true, lastActiveLabel: "1 week ago" },
];

const statusBadgeClass: Record<AdminMemberStatus, string> = {
  active: "bg-green-500 text-white",
  inactive: "bg-indigo-500 text-white",
};

const TABS = [
  { label: "Team Members", value: "members" },
  { label: "Roles & Permissions", value: "roles" },
  { label: "Audit Log", value: "audit" },
];

const AdminTeamPage = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [selectedAdmin, setSelectedAdmin] = useState<IAdminTeamMember | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  // const { data } = useGetAdminTeamMembersQuery();
  // const admins = data?.data?.data ?? [];
  const admins = DUMMY_ADMINS;

  const stats = {
    totalAdmins: admins.length,
    active: admins.filter((a) => a.status === "active").length,
    pendingInvites: 3,
  };

  // const [inviteAdmin] = useInviteAdminMutation();
  const handleInvite = async (_values: { fullName: string; email: string; role: string }) => {
    // await tryCatchWrapper(
    //   inviteAdmin,
    //   { fullName: _values.fullName, email: _values.email, role: _values.role },
    //   { toastLoadingMessage: "Sending invite..." }
    // );
    setIsInviteOpen(false);
  };

  // const [updateAdmin] = useUpdateAdminMutation();
  const handleEdit = async (_values: { fullName: string; email: string; role: string }) => {
    // await tryCatchWrapper(
    //   updateAdmin,
    //   { params: { id: selectedAdmin?._id }, body: _values },
    //   { toastLoadingMessage: "Updating admin..." }
    // );
    setIsEditOpen(false);
  };

  // const [removeAdmin] = useRemoveAdminMutation();
  const handleRemove = async (_admin: IAdminTeamMember) => {
    // await tryCatchWrapper(
    //   removeAdmin,
    //   { params: { id: _admin._id } },
    //   { toastLoadingMessage: "Removing admin..." }
    // );
    setIsRemoveOpen(false);
  };

  const columns: Column<IAdminTeamMember>[] = [
    {
      header: "Admin",
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
            <p className="text-xs text-secondbase-color">{row.adminCode}</p>
          </div>
        </div>
      ),
    },
    { header: "Email", accessorKey: "email", render: (value: string) => <span className="text-sm">{value}</span> },
    {
      header: "Role",
      accessorKey: "role",
      render: (value: string) => (
        <Tag className="bg-white border border-border text-base-color font-medium">{value}</Tag>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: AdminMemberStatus) => <Tag className={statusBadgeClass[value]}>{value}</Tag>,
    },
    {
      header: "2FA",
      accessorKey: "twoFactorEnabled",
      render: (value: boolean) =>
        value ? (
          <CircleCheck className="size-4 text-emerald-500" />
        ) : (
          <XCircle className="size-4 text-muted-foreground" />
        ),
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              setSelectedAdmin(row);
              setIsEditOpen(true);
            }}
          >
            <Pencil className="size-4 text-base-color" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              setSelectedAdmin(row);
              setIsRemoveOpen(true);
            }}
          >
            <Trash2 className="size-4 text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageWraper
      title="Admin Team Management"
      description="Manage admin team members, roles, and permissions"
      actions={
        <Button variant="secondary" onClick={() => setIsInviteOpen(true)}>
          <UserPlus className="size-4" />
          Invite Admin
        </Button>
      }
    >
      <AdminTeamStatCards {...stats} />

      <ReuseTabs options={TABS} value={activeTab} onChange={setActiveTab} />

      {activeTab === "members" && (
        <div className="bg-white rounded-xl border border-border shadow-sm">
          <div className="p-5 pb-4">
            <h2 className="text-base font-semibold text-base-color">Team Members</h2>
            <p className="text-sm text-secondbase-color">Manage admin accounts and access</p>
          </div>

          <ReusableTable data={admins} columns={columns} />
        </div>
      )}

      {activeTab === "roles" && <RolesPermissionsPanel />}

      {activeTab === "audit" && <AuditLogTab />}

      <AdminFormModal open={isInviteOpen} onClose={() => setIsInviteOpen(false)} mode="invite" onSubmit={handleInvite} />

      <AdminFormModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        mode="edit"
        admin={selectedAdmin}
        onSubmit={handleEdit}
      />

      <ConfirmModal<IAdminTeamMember>
        open={isRemoveOpen}
        onCancel={() => setIsRemoveOpen(false)}
        currentRecord={selectedAdmin}
        onConfirm={handleRemove}
        title="Remove Admin"
        description={`Remove ${selectedAdmin?.fullName} from the admin team`}
        confirmText="Remove Admin"
        cancelText="Cancel"
        variant="danger"
        warningText="This action is permanent. The admin will immediately lose access to the dashboard."
      />
    </PageWraper>
  );
};

export default AdminTeamPage;
