import OverviewStatCards from "@/Components/Dashboard/Overview/OverviewStatCards";
import UserOverviewChart from "@/Components/Dashboard/Overview/UserOverviewChart";
import EarningOverviewChart from "@/Components/Dashboard/Overview/EarningOverviewChart";
import TopStylistsTable from "@/Components/Dashboard/Overview/TopStylistsTable";
import ActionNeededSection from "@/Components/Dashboard/Overview/ActionNeededSection";
// import { useGetOverviewStatsQuery, useGetUserOverviewDataQuery, useGetEarningOverviewDataQuery, useGetTopStylistsQuery, useGetActionNeededQuery } from "@/redux/features/dashboard/dashboardApi";

// ── Component ────────────────────────────────────────────────────────────────

const OverviewPage = () => {

    return (
        <section className="min-h-screen p-6 sm:p-8 lg:p-10 space-y-6">

            {/* Status cards — from getOverviewStats */}
            <OverviewStatCards
            />

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* User Overview — from getUserOverviewData */}
                <UserOverviewChart

                />

                {/* Earning Overview — from getEarningOverviewData */}
                <EarningOverviewChart
                />
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Top Stylists — from getTopStylists */}
                <div className="lg:col-span-1">
                    <TopStylistsTable
                    />
                </div>

                {/* Action Needed — from getActionNeeded */}
                <div className="lg:col-span-2">
                    <ActionNeededSection

                    />
                </div>
            </div>


        </section>
    );
};

export default OverviewPage;
