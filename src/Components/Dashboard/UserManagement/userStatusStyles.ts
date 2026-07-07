import { UserStatus } from "@/types";

export const statusTheme: Record<UserStatus, "success" | "warning" | "error"> = {
  active: "success",
  suspended: "warning",
  banned: "error",
};

export const statusBadgeClass: Record<UserStatus, string> = {
  active: "bg-green-500 text-white",
  suspended: "bg-orange-500 text-white",
  banned: "bg-red-500 text-white",
};
