import { useState } from "react";
import { Download, Eye, Star, ThumbsUp } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import ReviewStatCards from "@/Components/Dashboard/Reviews/ReviewStatCards";
import ReviewDetailModal from "@/Components/Dashboard/Reviews/ReviewDetailModal";
import { IReview } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
// import { useGetReviewsQuery, useModerateReviewMutation } from "@/redux/features/review/reviewApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real reviews API data once the endpoint exists.
const DUMMY_REVIEWS: IReview[] = [
  { _id: "1", reviewCode: "REV-001", reviewerName: "John Smith", listingName: "Luxury Yacht - Sunseeker 88", ownerName: "Marina Elite Ltd", rating: 5, comment: "Absolutely amazing experience! The yacht was in pristine condition and exceeded all expectations. Captain was professional and the crew was fantastic.", date: "2026-05-15", helpfulCount: 24, status: "published" },
  { _id: "2", reviewCode: "REV-002", reviewerName: "Sarah Johnson", listingName: "Gulfstream G650 Private Jet", ownerName: "Sky Charter Services", rating: 5, comment: "Flawless service from start to finish. The jet was immaculate and the crew went above and beyond.", date: "2026-05-14", helpfulCount: 18, status: "published" },
  { _id: "3", reviewCode: "REV-003", reviewerName: "Michael Chen", listingName: "Ferrari 812 Superfast", ownerName: "Premium Motors", rating: 2, comment: "Car had minor scratches that were not mentioned in the listing description.", date: "2026-05-13", helpfulCount: 12, status: "flagged" },
  { _id: "4", reviewCode: "REV-004", reviewerName: "Emma Davis", listingName: "Catamaran - Caribbean", ownerName: "Ocean Adventures", rating: 1, comment: "Equipment was not as described. Very disappointed with the overall condition of the boat.", date: "2026-05-12", helpfulCount: 8, status: "flagged" },
  { _id: "5", reviewCode: "REV-005", reviewerName: "David Wilson", listingName: "Helicopter Tour", ownerName: "Sky Tours Inc", rating: 4, comment: "Great experience overall. The tour was breathtaking and the pilot was very knowledgeable.", date: "2026-05-11", helpfulCount: 15, status: "published" },
];

const RATING_DISTRIBUTION = [
  { stars: 5, count: 1234, percent: 68 },
  { stars: 4, count: 345, percent: 19 },
  { stars: 3, count: 156, percent: 9 },
  { stars: 2, count: 45, percent: 2 },
  { stars: 1, count: 38, percent: 2 },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Published", value: "published" },
  { label: "Flagged", value: "flagged" },
];

const statusBadgeClass: Record<IReview["status"], string> = {
  published: "bg-green-500 text-white",
  flagged: "bg-red-500 text-white",
};

const ReviewsRatingsPage = () => {
  const [, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // const { data } = useGetReviewsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const reviews = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const reviews = DUMMY_REVIEWS;
  const total = DUMMY_REVIEWS.length;

  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // const [moderateReview] = useModerateReviewMutation();

  const handleRemove = async (_review: IReview, _notes: string) => {
    // const res = await tryCatchWrapper(
    //   moderateReview,
    //   { params: { id: _review._id }, body: { action: "remove", notes: _notes } },
    //   { toastLoadingMessage: "Removing review..." }
    // );
    // if (res?.success) {
    setIsDetailOpen(false);
    // }
  };

  const handleDownloadReport = () => {
    const header = ["Review ID", "Reviewer", "Listing", "Owner", "Rating", "Comment", "Date", "Helpful", "Status"];
    const rows = reviews.map((r) => [r.reviewCode, r.reviewerName, r.listingName, r.ownerName, r.rating, r.comment, r.date, r.helpfulCount, r.status]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reviews-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<IReview>[] = [
    { header: "Review ID", accessorKey: "reviewCode" },
    {
      header: "Reviewer",
      accessorKey: "reviewerName",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-secondary-color text-white text-xs font-semibold">{getAvatar(row.reviewerName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-base-color">{row.reviewerName}</p>
            <p className="text-xs text-secondbase-color">{row.listingName}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Listing",
      accessorKey: "listingName",
      render: (_, row) => (
        <div>
          <p className="text-sm text-base-color">{row.listingName}</p>
          <p className="text-xs text-secondbase-color">{row.ownerName}</p>
        </div>
      ),
    },
    {
      header: "Rating",
      accessorKey: "rating",
      render: (value: number) => (
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-3.5 ${i < value ? "fill-amber-500 text-amber-500" : "text-border"}`} />
          ))}
        </div>
      ),
    },
    {
      header: "Comment",
      accessorKey: "comment",
      cellClassName: "max-w-64",
      render: (value: string) => <span className="text-sm text-secondbase-color line-clamp-1">{value}</span>,
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Helpful",
      accessorKey: "helpfulCount",
      render: (value: number) => (
        <span className="flex items-center gap-1 text-sm text-secondbase-color">
          <ThumbsUp className="size-3.5" />
          {value}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: IReview["status"]) => (
        <Tag theme="success" className={statusBadgeClass[value]}>
          {value}
        </Tag>
      ),
    },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => (
        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
          onClick={() => {
            setSelectedReview(row);
            setIsDetailOpen(true);
          }}
        >
          <Eye className="size-4 text-base-color" />
        </button>
      ),
    },
  ];

  return (
    <PageWraper
      title="Reviews & Ratings"
      description="Moderate reviews, manage ratings, and detect fraudulent content"
      actions={
        <Button variant="secondary" onClick={handleDownloadReport}>
          <Download className="size-4" />
          Download Report
        </Button>
      }
    >
      <ReviewStatCards />

      <div className="bg-white rounded-xl border border-border shadow-sm p-5">
        <h2 className="text-base font-semibold text-base-color">Rating Distribution</h2>
        <p className="text-sm text-secondbase-color mb-4">Overview of customer satisfaction</p>
        <div className="space-y-3">
          {RATING_DISTRIBUTION.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-base-color w-10 shrink-0">
                {row.stars} <Star className="size-3.5 fill-amber-500 text-amber-500" />
              </span>
              <div className="flex-1 h-2 rounded-full bg-background-color overflow-hidden">
                <div className="h-full rounded-full bg-secondary-color" style={{ width: `${row.percent}%` }} />
              </div>
              <span className="text-xs text-secondbase-color w-24 text-right shrink-0">
                {row.count.toLocaleString()} ({row.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
          <h2 className="text-base font-semibold text-base-color">All Reviews</h2>
          <div className="flex flex-wrap items-center gap-3">
            <ReuseSearchInput className="min-w-56" placeholder="Search reviews..." setSearch={setSearch} setPage={setCurrentPage} />
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
          data={reviews}
          columns={columns}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={total}
        />
      </div>

      <ReviewDetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        review={selectedReview}
        onRemove={handleRemove}
      />
    </PageWraper>
  );
};

export default ReviewsRatingsPage;
