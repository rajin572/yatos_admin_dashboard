import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Mail, Save } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { FormInput, FormSelect } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { AdminRole, IAdminTeamMember } from "@/types";
import { ADMIN_ROLES, ROLE_PERMISSIONS } from "./rolePermissions";

const adminFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  role: z.string().min(1, "Role is required"),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

interface AdminFormModalProps {
  open: boolean;
  onClose: () => void;
  mode: "invite" | "edit";
  admin?: IAdminTeamMember | null;
  onSubmit: (values: AdminFormValues) => void;
}

const AdminFormModal = ({ open, onClose, mode, admin, onSubmit }: AdminFormModalProps) => {
  const { control, handleSubmit, reset } = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: { fullName: "", email: "", role: "Support" },
  });

  const selectedRole = useWatch({ control, name: "role" }) as AdminRole | undefined;

  useEffect(() => {
    if (open) {
      reset({
        fullName: mode === "edit" ? admin?.fullName ?? "" : "",
        email: mode === "edit" ? admin?.email ?? "" : "",
        role: mode === "edit" ? admin?.role ?? "Support" : "Support",
      });
    }
  }, [open, mode, admin, reset]);

  const isEdit = mode === "edit";

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={isEdit ? "Edit Admin" : "Invite Admin"}
      description={isEdit ? "Update this admin's details and role" : "Send an invitation to join the admin team"}
      maxWidth="sm:max-w-md"
    >
      <form id="admin-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput control={control} name="fullName" label="Name" placeholder="Jhon Doe" />
        <FormInput control={control} name="email" label="Email Address" placeholder="admin@yatos.com" />

        <FormSelect control={control} name="role" label="Role" placeholder="Select role">
          {ADMIN_ROLES.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </FormSelect>

        {selectedRole && ROLE_PERMISSIONS[selectedRole] && (
          <div className="flex items-end justify-between gap-3">
            <div className="flex-1 rounded-lg bg-background-color p-4">
              <p className="text-sm font-medium text-base-color mb-2">Permissions for {selectedRole}:</p>
              <ul className="space-y-1">
                {ROLE_PERMISSIONS[selectedRole].map((permission) => (
                  <li key={permission} className="text-sm text-secondbase-color">
                    • {permission}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary">
                {isEdit ? <Save className="size-4" /> : <Mail className="size-4" />}
                {isEdit ? "Save Changes" : "Send Invite"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </ReusableModal>
  );
};

export default AdminFormModal;
