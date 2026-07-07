/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, TrendingUp, BookOpen, Mic2 } from "lucide-react";

const DUMMY_STATS = {
    totalUsers: "12,841",
    totalUsersTrend: "+465 this month",
    totalUsersTrendUp: true,
    mrr: "$38,420",
    mrrTrend: "+$4,370 vs last month",
    mrrTrendUp: true,
    scriptsPractised: "94,320",
    scriptsPractisedTrend: "+8.4k this week",
    scriptsPractisedTrendUp: true,
    auditionsLogged: "7,156",
    auditionsLoggedTrend: "-2,116 vs last week",
    auditionsLoggedTrendUp: false,
};

const statConfig = [
    {
        label: "Total Users",
        valueKey: "totalUsers" as const,
        trendKey: "totalUsersTrend" as const,
        trendUpKey: "totalUsersTrendUp" as const,
        icon: Users,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        label: "MRR",
        valueKey: "mrr" as const,
        trendKey: "mrrTrend" as const,
        trendUpKey: "mrrTrendUp" as const,
        icon: TrendingUp,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        label: "Scripts Practised",
        valueKey: "scriptsPractised" as const,
        trendKey: "scriptsPractisedTrend" as const,
        trendUpKey: "scriptsPractisedTrendUp" as const,
        icon: BookOpen,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
    },
    {
        label: "Auditions Logged",
        valueKey: "auditionsLogged" as const,
        trendKey: "auditionsLoggedTrend" as const,
        trendUpKey: "auditionsLoggedTrendUp" as const,
        icon: Mic2,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-500",
    },
];

interface DashboardStatCardsProps {
    stats?: any; // replace with typed API response when integrated
}

const DashboardStatCards = ({ stats }: DashboardStatCardsProps) => {
    const s = stats ?? DUMMY_STATS;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statConfig.map(({ label, valueKey, trendKey, trendUpKey, icon: Icon, iconBg, iconColor }) => (
                <div key={label} className="bg-white rounded-xl border border-border p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-secondbase-color font-medium uppercase tracking-wide">{label}</p>
                        <div className={`size-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                            <Icon className={`size-4 ${iconColor}`} />
                        </div>
                    </div>
                    <p className="text-2xl lg:text-3xl font-bold text-base-color">{s[valueKey]}</p>
                    <p className={`text-xs font-medium ${s[trendUpKey] ? "text-green-600" : "text-red-500"}`}>
                        {s[trendKey]}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DashboardStatCards;
