import { Users, Calendar, CreditCard } from "lucide-react";

interface StatCardData {
  label: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const DUMMY_STATS: StatCardData[] = [
  {
    label: "Earnings",
    value: "£1850",
    trend: "+8% vs last month",
    icon: CreditCard,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    label: "Total Pros",
    value: "24",
    trend: "+4 New this week",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Total Users",
    value: "247",
    trend: "+15 this week",
    icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    label: "Bookings This Month",
    value: "22",
    trend: "+4 New this week",
    icon: Calendar,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];


const OverviewStatCards = () => {
  // const { data: statsData } = useGetOverviewStatsQuery(undefined, { refetchOnMountOrArgChange: true });
  // const overviewStats = statsData?.data ?? undefined;
  const displayStats = DUMMY_STATS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map(({ label, value, trend, icon: Icon, iconBg, iconColor }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-secondbase-color font-medium uppercase tracking-wide">{label}</p>
            <div className={`size-10 rounded-lg ${iconBg} flex items-center justify-center`}>
              <Icon className={`size-5 ${iconColor}`} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mb-2">{value}</p>
          <p className="text-xs font-medium text-green-600">{trend}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewStatCards;
