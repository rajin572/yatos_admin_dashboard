import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/Components/ui/button";
import { FormInput } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { FieldGroup } from "@/Components/ui/field";
import { IAdminProfile } from "@/types";
import AvatarUpload from "./AvatarUpload";

const editProfileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string(),
});

type EditProfileValues = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
  profile: IAdminProfile;
  onSubmit: (values: { fullName: string; profileImage?: File }) => void;
}

const EditProfileForm = ({ profile, onSubmit }: EditProfileFormProps) => {
  const { control, handleSubmit, reset } = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { fullName: profile.fullName, email: profile.email },
  });

  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    reset({ fullName: profile.fullName, email: profile.email });
    setAvatarFile(undefined);
  }, [profile, reset]);

  const submit = (values: EditProfileValues) => {
    onSubmit({ fullName: values.fullName, profileImage: avatarFile });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FieldGroup>
        <AvatarUpload name={profile.fullName} imageUrl={profile.profileImage} onChange={setAvatarFile} />

        <FormInput control={control} name="fullName" label="Full Name" placeholder="Enter your name" />
        <FormInput control={control} name="email" label="Email Address" disabled />

        <Button variant="secondary" className="w-fit" type="submit">
          Save Changes
        </Button>
      </FieldGroup>
    </form>
  );
};

export default EditProfileForm;
