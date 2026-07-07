import { MessageSquare, TrendingUp } from "lucide-react";

interface StatCardData {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

// TODO: replace with real review-stats API data once the endpoint exists.
const DUMMY_STATS: StatCardData[] = [
  {
    label: "Total Reviews",
    value: "1,818",
    icon: MessageSquare,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Average Rating",
    value: "4.6",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const ReviewStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {DUMMY_STATS.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-secondbase-color">{label}</p>
            <div className={`size-9 rounded-full ${iconBg} flex items-center justify-center`}>
              <Icon className={`size-4 ${iconColor}`} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-3 flex items-center gap-1">
            {value}
            {label === "Average Rating" && <span className="text-amber-500 text-xl">★</span>}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewStatCards;
