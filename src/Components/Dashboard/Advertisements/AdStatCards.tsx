import { MousePointerClick, Star, TrendingUp, Zap } from "lucide-react";

interface StatCardData {
  label: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

// TODO: replace with real advertisement-stats API data once the endpoint exists.
const DUMMY_STATS: StatCardData[] = [
  {
    label: "Active Ads",
    value: "6",
    description: "Currently live on platform",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Sponsored Listings",
    value: "3",
    description: "Appearing in search results",
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    label: "Total Impressions",
    value: "24.8K",
    description: "This month across all placements",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    label: "Avg. Click Rate",
    value: "3.2%",
    description: "Across all active ads",
    icon: MousePointerClick,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
];

const AdStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {DUMMY_STATS.map(({ label, value, description, icon: Icon, iconBg, iconColor }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-secondbase-color">{label}</p>
            <div className={`size-9 rounded-full ${iconBg} flex items-center justify-center`}>
              <Icon className={`size-4 ${iconColor}`} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-3">{value}</p>
          <p className="text-xs text-secondbase-color mt-1">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default AdStatCards;
