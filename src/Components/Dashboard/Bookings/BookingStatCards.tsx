import { AlertTriangle, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

interface StatCardData {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

// TODO: replace with real booking-stats API data once the endpoint exists.
const DUMMY_STATS: StatCardData[] = [
  {
    label: "Total Bookings",
    value: "2,010",
    icon: Calendar,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Confirmed",
    value: "1,456",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    label: "Pending",
    value: "234",
    icon: Clock,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    label: "Disputed",
    value: "28",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    label: "Cancelled",
    value: "292",
    icon: XCircle,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
  },
];

const BookingStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {DUMMY_STATS.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-secondbase-color">{label}</p>
            <div className={`size-9 rounded-full ${iconBg} flex items-center justify-center`}>
              <Icon className={`size-4 ${iconColor}`} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-3">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingStatCards;
