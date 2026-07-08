import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminRole } from "@/types";
import { ADMIN_ROLES, ROLE_PERMISSIONS } from "./rolePermissions";

const RolesPermissionsPanel = () => {
  const [selectedRole, setSelectedRole] = useState<AdminRole>("Super Admin");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-border shadow-sm p-5">
        <h2 className="text-base font-semibold text-base-color">Roles</h2>
        <p className="text-sm text-secondbase-color mb-4">Select a role to view permissions</p>

        <div className="flex flex-col gap-2">
          {ADMIN_ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                selectedRole === role
                  ? "bg-secondary-color text-white"
                  : "bg-white border border-border text-base-color hover:bg-background-color"
              )}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm p-5">
        <h2 className="text-base font-semibold text-base-color">{selectedRole} Permissions</h2>
        <p className="text-sm text-secondbase-color mb-4">Permissions granted to {selectedRole.toLowerCase()} role</p>

        <div className="flex flex-col gap-3">
          {ROLE_PERMISSIONS[selectedRole].map((permission) => (
            <div
              key={permission}
              className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-border"
            >
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
              <span className="text-sm text-base-color">{permission}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsPanel;
