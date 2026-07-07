/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import YearOption from "@/Components/ui/CustomUi/ReuseYearSelect";

export interface GrowthDataPoint {
    month: string;
    Users: number;
    Revenue: number;
}

const DUMMY_DATA: GrowthDataPoint[] = [
    { month: "Jan", Users: 7200, Revenue: 21000 },
    { month: "Feb", Users: 7800, Revenue: 23500 },
    { month: "Mar", Users: 8400, Revenue: 25800 },
    { month: "Apr", Users: 9100, Revenue: 27200 },
    { month: "May", Users: 9800, Revenue: 29400 },
    { month: "Jun", Users: 10300, Revenue: 31000 },
    { month: "Jul", Users: 10900, Revenue: 33200 },
    { month: "Aug", Users: 11400, Revenue: 34800 },
    { month: "Sep", Users: 11800, Revenue: 36000 },
    { month: "Oct", Users: 12100, Revenue: 37100 },
    { month: "Nov", Users: 12500, Revenue: 37900 },
    { month: "Dec", Users: 12841, Revenue: 38420 },
];

interface UserGrowthChartProps {
    data?: GrowthDataPoint[]; // replace with typed API response when integrated
    year: string;
    onYearChange: (year: string) => void;
}

const UserGrowthChart = ({ data, year, onYearChange }: UserGrowthChartProps) => {
    const [chartMode, setChartMode] = useState<"Users" | "Revenue">("Users");
    const chartData = data ?? DUMMY_DATA;

    return (
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div>
                    <p className="font-semibold text-base-color">User Growth & Revenue</p>
                    <p className="text-xs text-secondbase-color">monthly · {year}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 bg-muted rounded-lg p-1">
                        {(["Users", "Revenue"] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setChartMode(mode)}
                                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${chartMode === mode ? "bg-white shadow text-base-color" : "text-secondbase-color"}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                    <YearOption
                        currentYear={new Date().getFullYear()}
                        setThisYear={onYearChange}
                        className="w-24 h-8 text-xs"
                    />
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                        <linearGradient id="colorGrow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#180E27" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#180E27" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip
                        formatter={(v: any) =>
                            chartMode === "Revenue"
                                ? [`$${Number(v).toLocaleString()}`, "Revenue"]
                                : [Number(v).toLocaleString(), "Users"]
                        }
                        contentStyle={{ borderRadius: 8, fontSize: 12 }}
                    />
                    <Area
                        type="monotone"
                        dataKey={chartMode}
                        stroke="#180E27"
                        strokeWidth={2}
                        fill="url(#colorGrow)"
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserGrowthChart;
