/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import YearOption from "@/Components/ui/CustomUi/ReuseYearSelect";

export interface SubscriptionMixDataPoint {
    name: string;
    value: number;
    color: string;
}

const DUMMY_DATA: SubscriptionMixDataPoint[] = [
    { name: "Free", value: 6842, color: "#E5E7EB" },
    { name: "Pro", value: 4103, color: "#180E27" },
    { name: "Premium", value: 1896, color: "#7C3AED" },
];

interface SubscriptionMixChartProps {
    data?: SubscriptionMixDataPoint[]; // replace with typed API response when integrated
    year: string;
    onYearChange: (year: string) => void;
}

const SubscriptionMixChart = ({ data, year, onYearChange }: SubscriptionMixChartProps) => {
    const chartData = data ?? DUMMY_DATA;

    return (
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                <p className="font-semibold text-base-color">Subscription Mix</p>
                <YearOption
                    currentYear={new Date().getFullYear()}
                    setThisYear={onYearChange}
                    className="w-24 h-8 text-xs"
                />
            </div>
            <p className="text-xs text-secondbase-color mb-3">by plan tier · {year}</p>

            {/* Pie chart — no Recharts Legend to avoid overlap */}
            <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={170}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={78}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(v: any, name: any) => [Number(v).toLocaleString(), name]}
                            contentStyle={{ borderRadius: 8, fontSize: 12 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Custom legend — below the chart, no overlap */}
            <div className="flex flex-col gap-2 mt-2 border-t border-border pt-3">
                {chartData.map(({ name, value, color }) => (
                    <div key={name} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                            <span className="text-secondbase-color font-medium">{name}</span>
                        </span>
                        <span className="font-bold text-base-color">{value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionMixChart;
