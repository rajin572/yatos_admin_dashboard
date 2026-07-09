import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/Components/ui/button";
import { FormPassword } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { FieldGroup } from "@/Components/ui/field";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
  onSubmit: (values: { currentPassword: string; newPassword: string }) => void;
}

const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const { control, handleSubmit, reset, formState } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) reset();
  }, [formState.isSubmitSuccessful, reset]);

  const submit = (values: ChangePasswordValues) => {
    onSubmit({ currentPassword: values.currentPassword, newPassword: values.newPassword });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FieldGroup>
        <FormPassword control={control} name="currentPassword" label="Current Password" placeholder="Enter your current password" />
        <FormPassword control={control} name="newPassword" label="New Password" placeholder="Enter your new password" />
        <FormPassword control={control} name="confirmPassword" label="Confirm New Password" placeholder="Re-enter your new password" />

        <Button variant="secondary" className="w-fit" type="submit">
          Update Password
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ChangePasswordForm;
