import { Award } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { IListing } from "@/types";

interface FeatureListingModalProps {
  open: boolean;
  onClose: () => void;
  listing: IListing | null;
  onFeature: (listing: IListing) => void;
}

const BENEFITS = [
  "Top placement in search results",
  "Homepage carousel visibility",
  "Priority in category listings",
  "Special badge and highlighting",
];

const FeatureListingModal = ({ open, onClose, listing, onFeature }: FeatureListingModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Feature Listing"
      description="Promote this listing to featured status for increased visibility"
      maxWidth="sm:max-w-lg"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white"
            onClick={() => listing && onFeature(listing)}
          >
            <Award className="size-4" />
            Feature Listing
          </Button>
        </div>
      }
    >
      {listing && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-background-color p-3">
            <p className="text-sm font-medium text-base-color">{listing.title}</p>
            <p className="text-xs text-secondbase-color">
              {listing.listingCode} • {listing.ownerName}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Featured Benefits</p>
            <ul className="space-y-1.5">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-base-color">
                  <span className="size-1.5 rounded-full bg-secondary-color shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 items-start rounded-md border border-amber-300 bg-amber-50 p-3">
            <Award className="size-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-700">Featured Listing</p>
              <p className="text-xs text-amber-700">This listing will be promoted for 30 days with enhanced visibility.</p>
            </div>
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default FeatureListingModal;
