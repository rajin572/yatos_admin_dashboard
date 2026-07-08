import { TrendingUp, DollarSign, Calendar, Users } from "lucide-react";
import { IReportsStats } from "@/types";

interface ReportsStatCardsProps {
  stats: IReportsStats;
}

const ReportsStatCards = ({ stats }: ReportsStatCardsProps) => {
  const cards = [
    {
      label: "Growth Rate",
      value: `+${stats.growthRate}%`,
      icon: TrendingUp,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      label: "Avg. Booking Value",
      value: `$${stats.avgBookingValue.toLocaleString()}`,
      icon: DollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: Calendar,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      label: "Retention Rate",
      value: `${stats.retentionRate}%`,
      icon: Users,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-5 shadow-sm flex items-center gap-3">
          <div className={`size-12 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-secondbase-color">{label}</p>
            <p className="text-xl lg:text-2xl font-bold text-base-color mt-0.5">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsStatCards;
