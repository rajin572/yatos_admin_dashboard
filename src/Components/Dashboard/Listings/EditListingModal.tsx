import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { FormCheckbox, FormInput, FormSelect } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { IListing } from "@/types";

const editListingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priceLabel: z.string().min(1, "Price is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  featured: z.boolean().optional(),
});

type EditListingValues = z.infer<typeof editListingSchema>;

interface EditListingModalProps {
  open: boolean;
  onClose: () => void;
  listing: IListing | null;
  onSave: (listing: IListing, values: EditListingValues) => void;
}

const EditListingModal = ({ open, onClose, listing, onSave }: EditListingModalProps) => {
  const { control, handleSubmit, reset } = useForm<EditListingValues>({
    resolver: zodResolver(editListingSchema),
    defaultValues: {
      title: "",
      priceLabel: "",
      location: "",
      category: "",
      status: "active",
      featured: false,
    },
  });

  useEffect(() => {
    if (open && listing) {
      reset({
        title: listing.title,
        priceLabel: listing.priceLabel,
        location: listing.location,
        category: listing.category,
        status: listing.status,
        featured: listing.featured,
      });
    }
  }, [open, listing, reset]);

  const onSubmit = (values: EditListingValues) => {
    if (listing) onSave(listing, values);
  };

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Edit Listing"
      description={listing ? `Update listing information for ${listing.listingCode}` : undefined}
      maxWidth="sm:max-w-lg"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" type="submit" form="edit-listing-form">
            Save Changes
          </Button>
        </div>
      }
    >
      {listing && (
        <form id="edit-listing-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput control={control} name="title" label="Title" />

          <div className="grid grid-cols-2 gap-4">
            <FormInput control={control} name="priceLabel" label="Price" />
            <FormInput control={control} name="location" label="Location" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormSelect control={control} name="category" label="Category" placeholder="Select category">
              <SelectItem value="boat">Boat</SelectItem>
              <SelectItem value="air">Aircraft</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </FormSelect>
            <FormSelect control={control} name="status" label="Status" placeholder="Select status">
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </FormSelect>
          </div>

          <FormCheckbox control={control} name="featured" label="Featured listing — Show this listing in promoted placements" />
        </form>
      )}
    </ReusableModal>
  );
};

export default EditListingModal;
