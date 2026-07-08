import { AdminRole } from "@/types";

export const ADMIN_ROLES: AdminRole[] = ["Super Admin", "Admin", "Moderator", "Support"];

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  "Super Admin": [
    "Full system access",
    "Manage admin team",
    "Platform settings",
    "Financial operations",
    "User management",
    "Content management",
  ],
  Admin: [
    "User management",
    "Listing management",
    "Booking management",
    "Payment operations",
    "Review moderation",
  ],
  Moderator: ["Review moderation", "Content approval", "User support", "Report handling"],
  Support: ["User support", "Ticket management", "Basic user operations"],
};
