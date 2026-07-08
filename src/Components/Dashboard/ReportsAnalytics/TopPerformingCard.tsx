import { LucideIcon } from "lucide-react";
import { ITopPerformingItem } from "@/types";

interface TopPerformingCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  items: ITopPerformingItem[];
}

const formatRevenue = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  return `$${(value / 1_000).toFixed(0)}k`;
};

const TopPerformingCard = ({ title, icon: Icon, iconColor = "text-secondary-color", items }: TopPerformingCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-base-color">
        <Icon className={`size-4 ${iconColor}`} />
        {title}
      </h2>

      <div className="flex flex-col gap-4 mt-4">
        {items.map(({ name, rank, revenue }) => (
          <div key={rank} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-base-color">{name}</p>
              <p className="text-xs text-secondbase-color">#{rank}</p>
            </div>
            <span className="rounded-full bg-emerald-500 text-white text-xs font-semibold px-3 py-1">
              {formatRevenue(revenue)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformingCard;
