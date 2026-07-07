/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import YearOption from "@/Components/ui/CustomUi/ReuseYearSelect";

export interface UserOverviewDataPoint {
  month: string;
  value: number;
}

const DUMMY_DATA: UserOverviewDataPoint[] = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 180 },
  { month: "Apr", value: 220 },
  { month: "May", value: 250 },
  { month: "Jun", value: 280 },
  { month: "Jul", value: 310 },
  { month: "Aug", value: 350 },
  { month: "Sep", value: 380 },
  { month: "Oct", value: 420 },
  { month: "Nov", value: 450 },
  { month: "Dec", value: 480 },
];

const UserOverviewChart = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());


  console.log(year)

  // const { data: userOverviewData } = useGetUserOverviewDataQuery({ year: year }, { refetchOnMountOrArgChange: true });
  // const userChartData = userOverviewData?.data ?? undefined;

  const chartData = DUMMY_DATA;

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-base-color">User Overview</p>
          <p className="text-xs text-secondbase-color">monthly growth</p>
        </div>
        <YearOption
          currentYear={new Date().getFullYear()}
          setThisYear={setYear}
          className="w-24 h-8 text-xs"
        />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v: any) => Number(v).toLocaleString()}
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#A78BFA"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOverviewChart;
