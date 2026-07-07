import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { FormCheckbox, FormInput, FormSelect } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { IListing } from "@/types";

const OWNER_OPTIONS = [
  "Marina Elite Ltd",
  "Prestige Yacht Rentals",
  "Elite Aviation Charter",
  "Premium Motors",
  "Ocean Adventures",
  "Sky Tours Inc",
];

const listingFormSchema = z.object({
  title: z.string().min(1, "Listing title is required"),
  category: z.string().min(1, "Category is required"),
  ownerName: z.string().min(1, "Owner is required"),
  priceLabel: z.string().min(1, "Price is required"),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Status is required"),
  featured: z.boolean().optional(),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

interface AddNewListingModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (listing: IListing) => void;
}

const AddNewListingModal = ({ open, onClose, onCreate }: AddNewListingModalProps) => {
  const { control, handleSubmit, reset } = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: "",
      category: "",
      ownerName: "",
      priceLabel: "",
      location: "",
      status: "pending_review",
      featured: false,
    },
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = (values: ListingFormValues) => {
    const listing: IListing = {
      _id: `new-${Date.now()}`,
      listingCode: `LST-${Math.floor(10000 + Math.random() * 89999)}`,
      title: values.title,
      category: values.category as IListing["category"],
      ownerName: values.ownerName,
      location: values.location,
      priceLabel: values.priceLabel,
      bookingsCount: 0,
      revenue: 0,
      rating: 0,
      reviewCount: 0,
      qualityScore: 0,
      qualityLabel: "New",
      status: values.status === "active" ? "active" : "active",
      featured: values.featured ?? false,
    };
    onCreate(listing);
  };

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Add New Listing"
      description="Create a new listing and assign it to an existing owner"
      maxWidth="sm:max-w-lg"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" type="submit" form="add-listing-form">
            Create Listing
          </Button>
        </div>
      }
    >
      <form id="add-listing-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput control={control} name="title" label="Listing Title" placeholder="e.g. Luxury Yacht - Sunseeker 88" />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect control={control} name="category" label="Category" placeholder="Select category">
            <SelectItem value="boat">Boat</SelectItem>
            <SelectItem value="air">Aircraft</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </FormSelect>
          <FormSelect control={control} name="ownerName" label="Assign Owner" placeholder="Select owner...">
            {OWNER_OPTIONS.map((owner) => (
              <SelectItem key={owner} value={owner}>
                {owner}
              </SelectItem>
            ))}
          </FormSelect>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput control={control} name="priceLabel" label="Price" placeholder="e.g. $12,500/day" />
          <FormInput control={control} name="location" label="Location" placeholder="e.g. Monaco" />
        </div>

        <div className="grid grid-cols-2 gap-4 items-start">
          <FormSelect control={control} name="status" label="Initial Status" placeholder="Select status">
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </FormSelect>
          <div>
            <p className="text-sm font-medium text-base-color mb-2">Featured</p>
            <FormCheckbox control={control} name="featured" label="Promote on launch" />
          </div>
        </div>
      </form>
    </ReusableModal>
  );
};

export default AddNewListingModal;
