import { Building2, CheckCircle2, Clock, XCircle } from "lucide-react";

interface StatCardData {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

// TODO: replace with real owner-stats API data once the endpoint exists.
const DUMMY_STATS: StatCardData[] = [
  {
    label: "Total Owners",
    value: "1847",
    icon: Building2,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    label: "Verified",
    value: "1623",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    label: "Pending",
    value: "98",
    icon: Clock,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    label: "Rejected",
    value: "126",
    icon: XCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
];

const OwnerStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {DUMMY_STATS.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-secondbase-color">{label}</p>
            <div className={`size-10 rounded-full ${iconBg} flex items-center justify-center`}>
              <Icon className={`size-5 ${iconColor}`} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-3">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default OwnerStatCards;
