import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";

interface AuditLogEntry {
  _id: string;
  adminName: string;
  action: string;
  details: string;
  timestamp: string;
}

// TODO: replace with real audit-log API data once the endpoint exists.
const DUMMY_AUDIT_LOG: AuditLogEntry[] = [
  { _id: "1", adminName: "Sarah Johnson", action: "Suspended user", details: "USR-10003 · Michael Chen", timestamp: "5 minutes ago" },
  { _id: "2", adminName: "Michael Chen", action: "Approved listing", details: "LST-2045 · Sunseeker 88 Yacht", timestamp: "1 hour ago" },
  { _id: "3", adminName: "Sarah Johnson", action: "Invited admin", details: "david.w@yatos.com · Support", timestamp: "2 hours ago" },
  { _id: "4", adminName: "Emma Davis", action: "Resolved dispute", details: "DSP-3312 · Refund issued", timestamp: "1 day ago" },
  { _id: "5", adminName: "David Wilson", action: "Updated legal document", details: "Terms of Service", timestamp: "1 week ago" },
];

const AuditLogTab = () => {
  const columns: Column<AuditLogEntry>[] = [
    { header: "Admin", accessorKey: "adminName" },
    { header: "Action", accessorKey: "action" },
    { header: "Details", accessorKey: "details", render: (value: string) => <span className="text-sm text-secondbase-color">{value}</span> },
    { header: "Timestamp", accessorKey: "timestamp", render: (value: string) => <span className="text-xs text-secondbase-color">{value}</span> },
  ];

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-5 pb-4">
        <h2 className="text-base font-semibold text-base-color">Audit Log</h2>
        <p className="text-sm text-secondbase-color">Recent admin activity across the platform</p>
      </div>

      <ReusableTable data={DUMMY_AUDIT_LOG} columns={columns} />
    </div>
  );
};

export default AuditLogTab;
