import { useEffect, useState } from "react";
import { Star, ThumbsUp, XCircle } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { IReview } from "@/types";
import { getAvatar } from "@/utils/getAvatar";

interface ReviewDetailModalProps {
  open: boolean;
  onClose: () => void;
  review: IReview | null;
  onRemove: (review: IReview, notes: string) => void;
}

const ReviewDetailModal = ({ open, onClose, review, onRemove }: ReviewDetailModalProps) => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) setNotes("");
  }, [open]);

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Review"
      description={review ? `Review details for ${review.reviewCode}` : undefined}
      maxWidth="sm:max-w-md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => review && onRemove(review, notes)}
          >
            <XCircle className="size-4" />
            Remove Review
          </Button>
        </div>
      }
    >
      {review && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-background-color p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-secondary-color text-white text-xs font-semibold">
                    {getAvatar(review.reviewerName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-base-color">{review.reviewerName}</p>
                  <p className="text-xs text-secondbase-color">{review.listingName}</p>
                </div>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-border"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-base-color mt-3">{review.comment}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-secondbase-color">
              <span>{review.date}</span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="size-3" />
                {review.helpfulCount} found helpful
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Moderation Notes</p>
            <Textarea
              className="border-base-color/30 bg-primary-color"
              placeholder="Add notes about this review..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default ReviewDetailModal;
