import { Shield, CheckCircle2, Mail } from "lucide-react";

interface AdminTeamStatCardsProps {
  totalAdmins: number;
  active: number;
  pendingInvites: number;
}

const AdminTeamStatCards = ({ totalAdmins, active, pendingInvites }: AdminTeamStatCardsProps) => {
  const cards = [
    { label: "Total Admins", value: totalAdmins, icon: Shield, iconColor: "text-secondary-color" },
    { label: "Active", value: active, icon: CheckCircle2, iconColor: "text-emerald-500" },
    { label: "Pending Invites", value: pendingInvites, icon: Mail, iconColor: "text-amber-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, iconColor }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-secondbase-color">{label}</p>
            <p className="text-2xl font-bold text-base-color mt-2">{value}</p>
          </div>
          <Icon className={`size-7 ${iconColor}`} />
        </div>
      ))}
    </div>
  );
};

export default AdminTeamStatCards;
