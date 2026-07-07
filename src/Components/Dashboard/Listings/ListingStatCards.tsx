import { Award, Ship, TrendingUp } from "lucide-react";

interface StatCardData {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

// TODO: replace with real listing-stats API data once the endpoint exists.
const DUMMY_STATS: StatCardData[] = [
  {
    label: "Total Listings",
    value: "1,847",
    icon: Ship,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Active",
    value: "1,623",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    label: "Featured",
    value: "142",
    icon: Award,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
];

const ListingStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

export default ListingStatCards;
