import { useState } from "react";
import { ChevronRight, Eye, Home, Pause, Pencil, Play, Plus, Search } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import NewAdvertisementModal from "@/Components/Dashboard/Advertisements/NewAdvertisementModal";
import AdDetailModal from "@/Components/Dashboard/Advertisements/AdDetailModal";
import AdStatCards from "@/Components/Dashboard/Advertisements/AdStatCards";
import { placementLabel, statusBadgeClass } from "@/Components/Dashboard/Advertisements/adDisplay";
import { IAdvertisement, IFeaturedListingToggle } from "@/types";
import { categoryIcon } from "@/utils/categoryDisplay";
// import {
//   useGetAdvertisementsQuery,
//   useCreateAdvertisementMutation,
//   useUpdateAdvertisementMutation,
//   useToggleFeaturedListingMutation,
// } from "@/redux/features/advertisement/advertisementApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real advertisements API data once the endpoint exists.
const DUMMY_ADS: IAdvertisement[] = [
  { _id: "1", adCode: "AD-001", name: "Summer Yacht Sale", placement: "home_carousel", startDate: "Jun 01", endDate: "Jun 30", impressions: 8420, status: "active" },
  { _id: "2", adCode: "AD-002", name: "Helicopter Tours Miami", placement: "search_feed", startDate: "Jun 05", endDate: "Jun 25", impressions: 4210, status: "active" },
  { _id: "3", adCode: "AD-003", name: "Luxury Car Transfers", placement: "search_feed", startDate: "Jun 10", endDate: "Jun 10", impressions: 3890, status: "active" },
  { _id: "4", adCode: "AD-004", name: "VIP Boat Experience", placement: "home_carousel", startDate: "May 20", endDate: "Jun 20", impressions: 6100, status: "paused" },
  { _id: "5", adCode: "AD-005", name: "Island Air Charter", placement: "search_feed", startDate: "Jul 01", endDate: "Jul 31", impressions: 0, status: "scheduled" },
  { _id: "6", adCode: "AD-006", name: "Wedding Fleet Special", placement: "home_carousel", startDate: "May 01", endDate: "May 31", impressions: 11240, status: "ended" },
];

const DUMMY_FEATURED_LISTINGS: IFeaturedListingToggle[] = [
  { _id: "1", name: "Sea Breeze Yacht", category: "boat", featured: true },
  { _id: "2", name: "Bell 407 Helicopter", category: "air", featured: true },
  { _id: "3", name: "Sunseeker 75ft Yacht", category: "boat", featured: false },
  { _id: "4", name: "Bell 407 Helicopter", category: "air", featured: true },
];

const PERFORMANCE_OVERVIEW = [
  { label: "Home carousel clicks", value: "1,842", change: "+12%" },
  { label: "Search feed clicks", value: "986", change: "+8%" },
  { label: "Conversions", value: "234", change: "+4%" },
];

const PLACEMENT_OPTIONS: FilterOption[] = [
  { label: "All placements", value: "all" },
  { label: "Home carousel", value: "home_carousel" },
  { label: "Search feed", value: "search_feed" },
];

const AdvertisementsPage = () => {
  const [placementFilter, setPlacementFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // const { data } = useGetAdvertisementsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     placement: placementFilter === "all" ? undefined : placementFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const ads = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const [ads, setAds] = useState(DUMMY_ADS);
  const total = ads.length;

  const [featuredListings, setFeaturedListings] = useState(DUMMY_FEATURED_LISTINGS);

  const [selectedAd, setSelectedAd] = useState<IAdvertisement | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // const [createAdvertisement] = useCreateAdvertisementMutation();
  // const [updateAdvertisement] = useUpdateAdvertisementMutation();
  // const [toggleFeaturedListing] = useToggleFeaturedListingMutation();

  const handleCreate = async (ad: IAdvertisement) => {
    // const res = await tryCatchWrapper(
    //   createAdvertisement,
    //   { body: { name: ad.name, placement: ad.placement, startDate: ad.startDate, endDate: ad.endDate, status: ad.status } },
    //   { toastLoadingMessage: "Creating advertisement..." }
    // );
    // if (res?.success) {
    setAds((prev) => [ad, ...prev]);
    setIsCreateOpen(false);
    // }
  };

  const handleTogglePause = async (ad: IAdvertisement) => {
    const nextStatus = ad.status === "active" ? "paused" : "active";
    // const res = await tryCatchWrapper(
    //   updateAdvertisement,
    //   { params: { id: ad._id }, body: { status: nextStatus } },
    //   { toastLoadingMessage: nextStatus === "paused" ? "Pausing ad..." : "Resuming ad..." }
    // );
    // if (res?.success) {
    setAds((prev) => prev.map((a) => (a._id === ad._id ? { ...a, status: nextStatus } : a)));
    // }
  };

  const handleToggleFeatured = async (listing: IFeaturedListingToggle) => {
    // const res = await tryCatchWrapper(
    //   toggleFeaturedListing,
    //   { params: { id: listing._id } },
    //   { toastLoadingMessage: "Updating featured listing..." }
    // );
    // if (res?.success) {
    setFeaturedListings((prev) =>
      prev.map((l) => (l._id === listing._id ? { ...l, featured: !l.featured } : l))
    );
    // }
  };

  const columns: Column<IAdvertisement>[] = [
    { header: "Ad Name", accessorKey: "name" },
    {
      header: "Placement",
      accessorKey: "placement",
      render: (value: IAdvertisement["placement"]) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-base-color">
          {value === "home_carousel" ? <Home className="size-3.5" /> : <Search className="size-3.5" />}
          {placementLabel[value]}
        </span>
      ),
    },
    { header: "Start", accessorKey: "startDate" },
    { header: "End", accessorKey: "endDate" },
    {
      header: "Impressions",
      accessorKey: "impressions",
      render: (value: number) => <span className="text-sm">{value.toLocaleString()}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IAdvertisement["status"]) => (
        <Tag theme="success" className={statusBadgeClass[value]}>
          {value}
        </Tag>
      ),
    },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              setSelectedAd(row);
              setIsDetailOpen(true);
            }}
          >
            <Eye className="size-4 text-base-color" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              setSelectedAd(row);
              setIsDetailOpen(true);
            }}
          >
            <Pencil className="size-4 text-base-color" />
          </button>
          {row.status === "active" && (
            <button type="button" className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer" onClick={() => handleTogglePause(row)}>
              <Pause className="size-4 text-amber-500" />
            </button>
          )}
          {row.status === "paused" && (
            <button type="button" className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer" onClick={() => handleTogglePause(row)}>
              <Play className="size-4 text-emerald-500" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageWraper
      title="Advertisements"
      description="Manage sponsored listings and banner ads across the platform"
      actions={
        <Button variant="secondary" onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          Create New Ad
        </Button>
      }
    >
      <AdStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
            <div>
              <h2 className="text-base font-semibold text-base-color">All Advertisements</h2>
              <p className="text-sm text-secondbase-color">Manage all banner ads and sponsored placements</p>
            </div>
            <ReuseFilterSelect
              options={PLACEMENT_OPTIONS}
              value={placementFilter}
              onChange={(value) => {
                setPlacementFilter(value);
                setCurrentPage(1);
              }}
              placeholder="All placements"
            />
          </div>

          <ReusableTable
            data={ads}
            columns={columns}
            pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            total={total}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <h2 className="text-base font-semibold text-base-color">Feature Listings</h2>
            <p className="text-xs text-secondbase-color mb-3">Toggle to feature a listing at the top of search results</p>
            <div className="space-y-3">
              {featuredListings.map((listing) => {
                const Icon = categoryIcon[listing.category];
                return (
                  <div key={listing._id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-secondary-color" />
                      <div>
                        <p className="text-sm text-base-color">{listing.name}</p>
                        <p className="text-xs text-secondbase-color capitalize">{listing.category}</p>
                      </div>
                    </div>
                    <Switch
                      className="data-[state=checked]:bg-secondary-color"
                      checked={listing.featured}
                      onCheckedChange={() => handleToggleFeatured(listing)}
                    />
                  </div>
                );
              })}
            </div>
            <button type="button" className="flex items-center gap-1 text-sm text-secondary-color mt-4 cursor-pointer">
              Manage all listings
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <h2 className="text-base font-semibold text-base-color">Performance Overview</h2>
            <p className="text-xs text-secondbase-color mb-3">Last 30 days</p>
            <div className="space-y-3">
              {PERFORMANCE_OVERVIEW.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <p className="text-sm text-secondbase-color">{item.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-base-color">{item.value}</p>
                    <span className="text-xs font-medium text-emerald-600">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NewAdvertisementModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreate={handleCreate} />
      <AdDetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        ad={selectedAd}
        onEdit={() => setIsDetailOpen(false)}
      />
    </PageWraper>
  );
};

export default AdvertisementsPage;
