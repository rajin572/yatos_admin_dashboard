import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { FormDatePicker, FormInput, FormSelect, FormSwitch, FormUpload } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { IAdvertisement } from "@/types";

const adFormSchema = z.object({
  name: z.string().min(1, "Ad name is required"),
  placement: z.string().min(1, "Placement is required"),
  image: z.array(z.any()).optional(),
  headline: z.string().min(1, "Headline is required"),
  ctaText: z.string().min(1, "CTA button text is required"),
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),
  linkUrl: z.string().min(1, "Link URL is required"),
  activeImmediately: z.boolean().optional(),
});

type AdFormValues = z.infer<typeof adFormSchema>;

interface NewAdvertisementModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (ad: IAdvertisement) => void;
}

const NewAdvertisementModal = ({ open, onClose, onCreate }: NewAdvertisementModalProps) => {
  const { control, handleSubmit, reset } = useForm<AdFormValues>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      name: "",
      placement: "",
      image: [],
      headline: "",
      ctaText: "",
      linkUrl: "",
      activeImmediately: true,
    },
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = (values: AdFormValues) => {
    const ad: IAdvertisement = {
      _id: `new-${Date.now()}`,
      adCode: `AD-${Math.floor(100 + Math.random() * 899)}`,
      name: values.name,
      placement: values.placement as IAdvertisement["placement"],
      startDate: values.startDate.toISOString().slice(0, 10),
      endDate: values.endDate.toISOString().slice(0, 10),
      impressions: 0,
      status: values.activeImmediately ? "active" : "scheduled",
    };
    onCreate(ad);
  };

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="New Advertisement"
      description="Fill in the details below to publish a new ad"
      maxWidth="sm:max-w-lg"
      footer={
        <Button
          type="submit"
          form="new-ad-form"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
        >
          Publish Advertisement
        </Button>
      }
    >
      <form id="new-ad-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput control={control} name="name" label="Ad name" placeholder="e.g. Summer Yacht Sale" />

        <FormSelect control={control} name="placement" label="Placement" placeholder="Select placement">
          <SelectItem value="home_carousel">Home carousel</SelectItem>
          <SelectItem value="search_feed">Search feed</SelectItem>
        </FormSelect>

        <FormUpload
          control={control}
          name="image"
          label="Upload image"
          description="Recommended 1600x400px for carousel · 800x200px for search feed"
        />

        <FormInput control={control} name="headline" label="Ad headline" placeholder="Short headline (max 8 words)" />
        <FormInput control={control} name="ctaText" label="CTA button text" placeholder="e.g. Explore now" />

        <div className="grid grid-cols-2 gap-4">
          <FormDatePicker control={control} name="startDate" label="Start date" />
          <FormDatePicker control={control} name="endDate" label="End date" />
        </div>

        <FormInput control={control} name="linkUrl" label="Link URL" placeholder="https:// — where to send the user" />

        <FormSwitch control={control} name="activeImmediately" label="Set as active immediately" />
      </form>
    </ReusableModal>
  );
};

export default NewAdvertisementModal;
