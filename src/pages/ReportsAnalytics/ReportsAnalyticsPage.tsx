import { useState } from "react";
import { Download, Ship, Plane } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import { Button } from "@/Components/ui/button";
import ReportsStatCards from "@/Components/Dashboard/ReportsAnalytics/ReportsStatCards";
import GeographicPerformanceCard from "@/Components/Dashboard/ReportsAnalytics/GeographicPerformanceCard";
import TopPerformingCard from "@/Components/Dashboard/ReportsAnalytics/TopPerformingCard";
import UserGrowthAreaChart from "@/Components/Charts/UserGrowthAreaChart";
import GroupedBarChart, { BarSeries } from "@/Components/Charts/GroupedBarChart";
import CategorySplitChart from "@/Components/Charts/CategorySplitChart";
import { IReportsAnalyticsData } from "@/types";
// import { useGetReportsAnalyticsQuery } from "@/redux/features/reportsAnalytics/reportsAnalyticsApi";

// TODO: replace with real reports-analytics API data once the endpoint exists.
const DUMMY_REPORTS_DATA: IReportsAnalyticsData = {
  stats: {
    growthRate: 18.7,
    avgBookingValue: 8450,
    conversionRate: 24.3,
    retentionRate: 87.5,
  },
  userGrowth: [
    { month: "Jan", totalUsers: 7200, activeUsers: 6800 },
    { month: "Feb", totalUsers: 8100, activeUsers: 7500 },
    { month: "Mar", totalUsers: 8900, activeUsers: 8100 },
    { month: "Apr", totalUsers: 9800, activeUsers: 8700 },
    { month: "May", totalUsers: 10700, activeUsers: 9200 },
    { month: "Jun", totalUsers: 11600, activeUsers: 9900 },
  ],
  bookingPatterns: [
    { hour: "00:00", bookings: 12 },
    { hour: "04:00", bookings: 8 },
    { hour: "08:00", bookings: 45 },
    { hour: "12:00", bookings: 98 },
    { hour: "16:00", bookings: 118 },
    { hour: "20:00", bookings: 82 },
    { hour: "23:00", bookings: 30 },
  ],
  revenueByCategory: [
    { month: "Jan", boats: 65000, aircraft: 92000, land: 0 },
    { month: "Feb", boats: 70000, aircraft: 90000, land: 0 },
    { month: "Mar", boats: 68000, aircraft: 97000, land: 0 },
    { month: "Apr", boats: 78000, aircraft: 102000, land: 0 },
    { month: "May", boats: 82000, aircraft: 108000, land: 0 },
    { month: "Jun", boats: 85000, aircraft: 116000, land: 0 },
  ],
  categorySplit: [
    { category: "Boats", percentage: 60 },
    { category: "Aircraft", percentage: 40 },
  ],
  geographicPerformance: [
    { region: "North America", bookings: 2450, revenue: 485000 },
    { region: "Europe", bookings: 1890, revenue: 412000 },
    { region: "Asia Pacific", bookings: 1234, revenue: 298000 },
    { region: "Middle East", bookings: 890, revenue: 256000 },
    { region: "Latin America", bookings: 567, revenue: 145000 },
    { region: "Africa", bookings: 234, revenue: 78000 },
  ],
  topPerforming: {
    boats: [
      { name: "Sunseeker 88 Yacht", rank: 1, revenue: 562000 },
      { name: "Lagoon 450 Catamaran", rank: 2, revenue: 455000 },
      { name: "Princess 75 Motor Yacht", rank: 3, revenue: 398000 },
    ],
    aircraft: [
      { name: "Gulfstream G650", rank: 1, revenue: 1710000 },
      { name: "Bombardier Global 7500", rank: 2, revenue: 1320000 },
      { name: "Cessna Citation X", rank: 3, revenue: 890000 },
    ],
  },
};

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Revenue Analysis", value: "revenue" },
  { label: "Geographic Insights", value: "geographic" },
  { label: "Performance", value: "performance" },
];

const REVENUE_SERIES: BarSeries[] = [
  { key: "boats", label: "Boats", color: "#1e3a8a" },
  { key: "aircraft", label: "Aircraft", color: "#3b82f6" },
  { key: "land", label: "Land", color: "#93c5fd" },
];

const BOOKING_PATTERN_SERIES: BarSeries[] = [{ key: "bookings", label: "Bookings", color: "#3b82f6" }];

const ReportsAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // const { data } = useGetReportsAnalyticsQuery();
  // const reportsData = data?.data;
  const reportsData = DUMMY_REPORTS_DATA;

  const handleDownloadReport = () => {
    const json = JSON.stringify(reportsData, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reports-analytics.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageWraper
      title="Reports & Analytics"
      description="Comprehensive insights and performance metrics"
      actions={
        <Button variant="secondary" onClick={handleDownloadReport}>
          <Download className="size-4" />
          Download Report
        </Button>
      }
    >
      <ReportsStatCards stats={reportsData.stats} />

      <ReuseTabs options={TABS} value={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <h2 className="text-base font-semibold text-base-color">User Growth</h2>
            <p className="text-sm text-secondbase-color mb-2">Total vs Active Users</p>
            <UserGrowthAreaChart data={reportsData.userGrowth} />
          </div>

          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <h2 className="text-base font-semibold text-base-color">Booking Patterns</h2>
            <p className="text-sm text-secondbase-color mb-2">24-hour booking distribution</p>
            <GroupedBarChart
              data={reportsData.bookingPatterns}
              xKey="hour"
              series={BOOKING_PATTERN_SERIES}
            />
          </div>
        </div>
      )}

      {activeTab === "revenue" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <h2 className="text-base font-semibold text-base-color">Revenue by Transport Category</h2>
            <p className="text-sm text-secondbase-color mb-2">Monthly breakdown by vehicle type</p>
            <GroupedBarChart
              data={reportsData.revenueByCategory}
              xKey="month"
              series={REVENUE_SERIES}
              showLegend
            />
          </div>

          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <h2 className="text-base font-semibold text-base-color">Category Split</h2>
            <p className="text-sm text-secondbase-color mb-2">Revenue distribution</p>
            <CategorySplitChart data={reportsData.categorySplit} />
          </div>
        </div>
      )}

      {activeTab === "geographic" && (
        <GeographicPerformanceCard data={reportsData.geographicPerformance} />
      )}

      {activeTab === "performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopPerformingCard title="Top Performing Boats" icon={Ship} items={reportsData.topPerforming.boats} />
          <TopPerformingCard title="Top Performing Aircraft" icon={Plane} items={reportsData.topPerforming.aircraft} />
        </div>
      )}
    </PageWraper>
  );
};

export default ReportsAnalyticsPage;
