import { Star } from "lucide-react";
import { ITopListing } from "@/types";

interface TopListingsCardProps {
  listings: ITopListing[];
}

const TopListingsCard = ({ listings }: TopListingsCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      <h2 className="text-base font-semibold text-base-color">Top Listings</h2>
      <p className="text-sm text-secondbase-color mb-4">Best performing rentals</p>

      <div className="flex flex-col gap-4">
        {listings.map((listing) => (
          <div key={listing._id} className="flex items-center gap-3">
            <span className="flex items-center justify-center size-6 rounded-full bg-secondary-color text-white text-xs font-semibold shrink-0">
              {listing.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-base-color truncate">{listing.name}</p>
              <p className="text-xs text-secondbase-color">
                {listing.bookings} bookings • ${listing.revenue.toLocaleString()}
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-base-color shrink-0">
              {listing.rating}
              <Star className="size-3.5 fill-amber-500 text-amber-500" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopListingsCard;
