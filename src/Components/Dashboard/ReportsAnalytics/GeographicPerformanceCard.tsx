import { MapPin } from "lucide-react";
import { IGeographicPerformanceItem } from "@/types";

interface GeographicPerformanceCardProps {
  data: IGeographicPerformanceItem[];
}

const GeographicPerformanceCard = ({ data }: GeographicPerformanceCardProps) => {
  const maxBookings = Math.max(...data.map((item) => item.bookings), 1);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      <h2 className="text-base font-semibold text-base-color">Geographic Performance</h2>
      <p className="text-sm text-secondbase-color mb-4">Bookings and revenue by region</p>

      <div className="flex flex-col gap-5">
        {data.map(({ region, bookings, revenue }) => (
          <div key={region}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-base-color">
                <MapPin className="size-4 text-secondbase-color" />
                {region}
              </span>
              <span className="flex items-center gap-3 text-sm">
                <span className="text-secondbase-color">{bookings} bookings</span>
                <span className="font-semibold text-emerald-600">${(revenue / 1000).toFixed(0)}k</span>
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-background-color overflow-hidden">
              <div
                className="h-full rounded-full bg-secondary-color"
                style={{ width: `${(bookings / maxBookings) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicPerformanceCard;
