interface StatCardData {
  label: string;
  value: string;
  badge: string;
  badgeClass: string;
  description: string;
}

// TODO: replace with real payment-stats API data once the endpoint exists.
const DUMMY_STATS: StatCardData[] = [
  {
    label: "Total Revenue",
    value: "$1,245,000",
    badge: "+12.5%",
    badgeClass: "bg-emerald-100 text-emerald-600",
    description: "This month",
  },
  {
    label: "In Escrow",
    value: "$487,500",
    badge: "Escrow",
    badgeClass: "bg-blue-100 text-blue-600",
    description: "Pending release",
  },
  {
    label: "Pending Payouts",
    value: "$156,800",
    badge: "Processing",
    badgeClass: "bg-amber-100 text-amber-600",
    description: "23 transactions",
  },
  {
    label: "Failed Payments",
    value: "$12,300",
    badge: "Failed",
    badgeClass: "bg-red-500 text-white",
    description: "Requires attention",
  },
];

const PaymentStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {DUMMY_STATS.map(({ label, value, badge, badgeClass, description }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-secondbase-color">{label}</p>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}>{badge}</span>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-3">{value}</p>
          <p className="text-xs text-secondbase-color mt-1">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentStatCards;
