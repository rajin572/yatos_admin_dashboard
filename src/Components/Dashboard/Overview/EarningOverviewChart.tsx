/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import YearOption from "@/Components/ui/CustomUi/ReuseYearSelect";

export interface EarningOverviewDataPoint {
  month: string;
  value: number;
}

const DUMMY_DATA: EarningOverviewDataPoint[] = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1500 },
  { month: "Mar", value: 1800 },
  { month: "Apr", value: 1400 },
  { month: "May", value: 2100 },
  { month: "Jun", value: 2400 },
  { month: "Jul", value: 1900 },
  { month: "Aug", value: 2200 },
  { month: "Sep", value: 2600 },
  { month: "Oct", value: 2300 },
  { month: "Nov", value: 2700 },
  { month: "Dec", value: 3000 },
];


const EarningOverviewChart = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  console.log(year)

  // const { data: earningOverviewData } = useGetEarningOverviewDataQuery({ year: year }, { refetchOnMountOrArgChange: true });
  // const earningChartData = earningOverviewData?.data ?? undefined;
  const chartData = DUMMY_DATA;

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-base-color">Earning Overview</p>
          <p className="text-xs text-secondbase-color">monthly earnings</p>
        </div>
        <YearOption
          currentYear={new Date().getFullYear()}
          setThisYear={setYear}
          className="w-24 h-8 text-xs"
        />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v: any) => `£${Number(v).toLocaleString()}`}
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
          />
          <Bar dataKey="value" fill="#A78BFA" radius={[4, 4, 0, 0]}>
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill="#A78BFA" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningOverviewChart;
