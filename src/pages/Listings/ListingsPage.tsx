import { useState } from "react";
import { Calendar, Eye, Pencil, Plus, Star } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Button } from "@/Components/ui/button";
import ListingStatCards from "@/Components/Dashboard/Listings/ListingStatCards";
import AddNewListingModal from "@/Components/Dashboard/Listings/AddNewListingModal";
import ListingDetailsModal from "@/Components/Dashboard/Listings/ListingDetailsModal";
import EditListingModal from "@/Components/Dashboard/Listings/EditListingModal";
import FeatureListingModal from "@/Components/Dashboard/Listings/FeatureListingModal";
import { IListing } from "@/types";
import { categoryIcon } from "@/utils/categoryDisplay";
// import { useGetListingsQuery, useCreateListingMutation, useUpdateListingMutation, useFeatureListingMutation } from "@/redux/features/listing/listingApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real listings API data once the endpoint exists.
const INITIAL_LISTINGS: IListing[] = [
  { _id: "1", listingCode: "LST-10001", title: "Luxury Yacht - Sunseeker 88", category: "boat", ownerName: "Marina Elite Ltd", location: "Monaco", priceLabel: "$12,500/day", bookingsCount: 45, revenue: 562500, rating: 4.9, reviewCount: 38, qualityScore: 95, qualityLabel: "Excellent", status: "active", featured: true },
  { _id: "2", listingCode: "LST-10002", title: "Gulfstream G650 Private Jet", category: "air", ownerName: "Sky Charter Services", location: "Dubai", priceLabel: "$45,000/flight", bookingsCount: 38, revenue: 1710000, rating: 5, reviewCount: 29, qualityScore: 98, qualityLabel: "Excellent", status: "active", featured: true },
  { _id: "3", listingCode: "LST-10003", title: "Ferrari 812 Superfast", category: "land", ownerName: "Premium Motors", location: "Los Angeles", priceLabel: "$3,200/day", bookingsCount: 67, revenue: 214400, rating: 4.8, reviewCount: 52, qualityScore: 92, qualityLabel: "Excellent", status: "active", featured: true },
  { _id: "4", listingCode: "LST-10004", title: "Catamaran - Lagoon 450", category: "boat", ownerName: "Ocean Adventures", location: "Caribbean", priceLabel: "$8,750/week", bookingsCount: 52, revenue: 455000, rating: 4.9, reviewCount: 41, qualityScore: 90, qualityLabel: "Excellent", status: "active", featured: true },
  { _id: "5", listingCode: "LST-10005", title: "Helicopter - Robinson R44", category: "air", ownerName: "Sky Tours Inc", location: "New York", priceLabel: "$2,800/hour", bookingsCount: 23, revenue: 84400, rating: 4.3, reviewCount: 18, qualityScore: 72, qualityLabel: "Good", status: "flagged", featured: false },
];

const CATEGORY_OPTIONS: FilterOption[] = [
  { label: "All Category", value: "all" },
  { label: "Boat", value: "boat" },
  { label: "Aircraft", value: "air" },
  { label: "Land", value: "land" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Flagged", value: "flagged" },
];

const ListingsPage = () => {
  const [, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // const { data } = useGetListingsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     category: categoryFilter === "all" ? undefined : categoryFilter,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const listingsFromApi = data?.data?.data ?? [];

  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<IListing | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);

  // const [createListing] = useCreateListingMutation();
  // const [updateListing] = useUpdateListingMutation();
  // const [featureListing] = useFeatureListingMutation();

  const handleCreate = async (listing: IListing) => {
    // const res = await tryCatchWrapper(
    //   createListing,
    //   {
    //     body: {
    //       title: listing.title,
    //       category: listing.category,
    //       ownerName: listing.ownerName,
    //       priceLabel: listing.priceLabel,
    //       location: listing.location,
    //       status: listing.status,
    //       featured: listing.featured,
    //     },
    //   },
    //   { toastLoadingMessage: "Creating listing..." }
    // );
    // if (res?.success) {
    //   setListings((prev) => [listing, ...prev]);
    //   setIsAddOpen(false);
    // }
    setListings((prev) => [listing, ...prev]);
    setIsAddOpen(false);
  };

  const handleSave = async (
    listing: IListing,
    values: { title: string; priceLabel: string; location: string; category: string; status: string; featured?: boolean }
  ) => {
    // const res = await tryCatchWrapper(
    //   updateListing,
    //   { params: { id: listing._id }, body: values },
    //   { toastLoadingMessage: "Saving changes..." }
    // );
    // if (res?.success) {
    setListings((prev) =>
      prev.map((l) =>
        l._id === listing._id
          ? {
              ...l,
              title: values.title,
              priceLabel: values.priceLabel,
              location: values.location,
              category: values.category as IListing["category"],
              status: values.status as IListing["status"],
              featured: values.featured ?? l.featured,
            }
          : l
      )
    );
    setIsEditOpen(false);
    // }
  };

  const handleFeature = async (listing: IListing) => {
    // const res = await tryCatchWrapper(
    //   featureListing,
    //   { params: { id: listing._id } },
    //   { toastLoadingMessage: "Featuring listing..." }
    // );
    // if (res?.success) {
    setListings((prev) => prev.map((l) => (l._id === listing._id ? { ...l, featured: true } : l)));
    setIsFeatureOpen(false);
    // }
  };

  const columns: Column<IListing>[] = [
    {
      header: "Listing",
      accessorKey: "title",
      render: (_, row) => {
        const Icon = categoryIcon[row.category];
        return (
          <div className="flex items-start gap-2">
            <Icon className="size-4 text-secondary-color mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-base-color flex items-center gap-1">
                {row.title}
                {row.featured && <Star className="size-3.5 fill-amber-500 text-amber-500" />}
              </p>
              <p className="text-xs text-secondbase-color">{row.listingCode}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Category",
      accessorKey: "category",
      render: (value: IListing["category"]) => {
        const Icon = categoryIcon[value];
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-base-color">
            <Icon className="size-3.5" />
            {value}
          </span>
        );
      },
    },
    { header: "Owner", accessorKey: "ownerName" },
    { header: "Location", accessorKey: "location" },
    {
      header: "Price",
      accessorKey: "priceLabel",
      render: (value: string) => <span className="text-sm font-semibold text-base-color">{value}</span>,
    },
    {
      header: "Performance",
      accessorKey: "bookingsCount",
      render: (_, row) => (
        <div className="space-y-0.5">
          <p className="flex items-center gap-1 text-xs text-secondbase-color">
            <Calendar className="size-3" />
            {row.bookingsCount} bookings
          </p>
          <p className="flex items-center gap-1 text-xs text-emerald-600 font-medium">${row.revenue.toLocaleString()}</p>
          <p className="flex items-center gap-1 text-xs text-secondbase-color">
            <Star className="size-3 fill-amber-500 text-amber-500" />
            {row.rating} ({row.reviewCount})
          </p>
        </div>
      ),
    },
    {
      header: "Quality Score",
      accessorKey: "qualityScore",
      render: (_, row) => (
        <div className="w-32">
          <div className="h-1.5 rounded-full bg-background-color overflow-hidden mb-1">
            <div className="h-full rounded-full bg-secondary-color" style={{ width: `${row.qualityScore}%` }} />
          </div>
          <p className={`text-xs font-medium ${row.qualityScore >= 90 ? "text-emerald-600" : "text-amber-500"}`}>
            {row.qualityScore}% — {row.qualityLabel}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IListing["status"]) => (
        <Tag theme={value === "active" ? "success" : "error"} className={value === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
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
              setSelectedListing(row);
              setIsDetailsOpen(true);
            }}
          >
            <Eye className="size-4 text-base-color" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              setSelectedListing(row);
              setIsEditOpen(true);
            }}
          >
            <Pencil className="size-4 text-base-color" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              setSelectedListing(row);
              setIsFeatureOpen(true);
            }}
          >
            <Star className={`size-4 ${row.featured ? "fill-amber-500 text-amber-500" : "text-base-color"}`} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageWraper
      title="Listings Management"
      description="Manage all platform listings across transport categories"
      actions={
        <Button variant="secondary" onClick={() => setIsAddOpen(true)}>
          <Plus className="size-4" />
          Add New Listing
        </Button>
      }
    >
      <ListingStatCards />

      <div className="bg-white rounded-xl border border-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
          <h2 className="text-base font-semibold text-base-color">All Listings</h2>
          <div className="flex flex-wrap items-center gap-3">
            <ReuseSearchInput className="min-w-56" placeholder="Search listings..." setSearch={setSearch} setPage={setCurrentPage} />
            <ReuseFilterSelect
              options={CATEGORY_OPTIONS}
              value={categoryFilter}
              onChange={(value) => {
                setCategoryFilter(value);
                setCurrentPage(1);
              }}
              placeholder="All Category"
            />
            <ReuseFilterSelect
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              placeholder="All Status"
            />
          </div>
        </div>

        <ReusableTable
          data={listings}
          columns={columns}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={listings.length}
        />
      </div>

      <AddNewListingModal open={isAddOpen} onClose={() => setIsAddOpen(false)} onCreate={handleCreate} />
      <ListingDetailsModal
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        listing={selectedListing}
        onEdit={(listing) => {
          setIsDetailsOpen(false);
          setSelectedListing(listing);
          setIsEditOpen(true);
        }}
      />
      <EditListingModal open={isEditOpen} onClose={() => setIsEditOpen(false)} listing={selectedListing} onSave={handleSave} />
      <FeatureListingModal open={isFeatureOpen} onClose={() => setIsFeatureOpen(false)} listing={selectedListing} onFeature={handleFeature} />
    </PageWraper>
  );
};

export default ListingsPage;
