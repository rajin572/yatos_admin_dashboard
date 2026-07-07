import { useState } from "react";
import { Pencil, Star } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IListing } from "@/types";
import { categoryIcon, categoryLabel } from "@/utils/categoryDisplay";

interface ListingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  listing: IListing | null;
  onEdit: (listing: IListing) => void;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
    <span className="text-sm text-secondbase-color">{label}</span>
    <span className="text-sm font-medium text-base-color">{value}</span>
  </div>
);

const MetricBox = ({ label, value, valueClassName }: { label: string; value: React.ReactNode; valueClassName?: string }) => (
  <div className="rounded-lg border border-border p-3">
    <p className={`text-lg font-bold text-base-color ${valueClassName ?? ""}`}>{value}</p>
    <p className="text-xs text-secondbase-color">{label}</p>
  </div>
);

const ListingDetailsModal = ({ open, onClose, listing, onEdit }: ListingDetailsModalProps) => {
  const [tab, setTab] = useState("overview");

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Listing Details"
      description={listing ? `${listing.listingCode} — full overview and performance metrics` : undefined}
      maxWidth="sm:max-w-lg"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => listing && onEdit(listing)}>
            <Pencil className="size-4" />
            Edit Listing
          </Button>
        </div>
      }
    >
      {listing && (
        <div className="flex flex-col gap-4">
          <ReuseTabs
            options={[
              { label: "Overview", value: "overview" },
              { label: "Performance", value: "performance" },
              { label: "Details", value: "details" },
            ]}
            value={tab}
            onChange={setTab}
            className="w-full"
          />

          {tab === "overview" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  {(() => {
                    const Icon = categoryIcon[listing.category];
                    return <Icon className="size-5 text-secondary-color mt-0.5" />;
                  })()}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-base-color">{listing.title}</h3>
                      {listing.featured && (
                        <Tag theme="orange" className="bg-amber-500 text-white">
                          Featured
                        </Tag>
                      )}
                      <Tag
                        theme={listing.status === "active" ? "success" : "error"}
                        className={listing.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                      >
                        {listing.status}
                      </Tag>
                    </div>
                    <p className="text-xs text-secondbase-color mt-1">{listing.ownerName}</p>
                    <p className="text-xs text-secondbase-color">{listing.location}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-base-color">{listing.priceLabel}</p>
                  <p className="text-xs text-secondbase-color">{categoryLabel[listing.category].toLowerCase()}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <MetricBox label="Total Bookings" value={listing.bookingsCount} />
                <MetricBox label="Total Revenue" value={`$${listing.revenue.toLocaleString()}`} valueClassName="text-emerald-600" />
                <MetricBox
                  label="Avg Rating"
                  value={
                    <span className="flex items-center gap-1">
                      {listing.rating}
                      <Star className="size-4 fill-amber-500 text-amber-500" />
                    </span>
                  }
                />
              </div>
            </div>
          )}

          {tab === "performance" && (
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-base-color">Quality Score</p>
                  <p className={`text-sm font-semibold ${listing.qualityScore >= 90 ? "text-emerald-600" : "text-amber-500"}`}>
                    {listing.qualityScore}% — {listing.qualityLabel}
                  </p>
                </div>
                <div className="h-2 rounded-full bg-background-color overflow-hidden">
                  <div
                    className="h-full rounded-full bg-secondary-color"
                    style={{ width: `${listing.qualityScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricBox label="Reviews" value={listing.reviewCount} />
                <MetricBox label="Rating Score" value={`${listing.rating} / 5.0`} />
                <MetricBox label="Booking Count" value={listing.bookingsCount} />
                <MetricBox label="Revenue Generated" value={`$${listing.revenue.toLocaleString()}`} />
              </div>
            </div>
          )}

          {tab === "details" && (
            <div>
              <DetailRow label="Listing ID" value={listing.listingCode} />
              <DetailRow label="Owner" value={listing.ownerName} />
              <DetailRow label="Category" value={categoryLabel[listing.category]} />
              <DetailRow label="Location" value={listing.location} />
              <DetailRow label="Price" value={listing.priceLabel} />
              <DetailRow label="Featured" value={listing.featured ? "Yes" : "No"} />
              <DetailRow label="Status" value={listing.status === "active" ? "Active" : "Flagged"} />
            </div>
          )}
        </div>
      )}
    </ReusableModal>
  );
};

export default ListingDetailsModal;
