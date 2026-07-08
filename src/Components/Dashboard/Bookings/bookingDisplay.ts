import { BookingStatus, CancelledBy, DisputePriority, DisputeStatus, RefundStatus } from "@/types";

export const bookingStatusClass: Record<BookingStatus, string> = {
  confirmed: "bg-green-500 text-white",
  pending: "bg-amber-500 text-white",
  completed: "bg-blue-500 text-white",
  disputed: "bg-red-500 text-white",
  cancelled: "bg-gray-400 text-white",
};

export const disputePriorityClass: Record<DisputePriority, string> = {
  high: "bg-red-500 text-white",
  medium: "bg-amber-500 text-white",
  low: "bg-gray-400 text-white",
};

export const disputeStatusClass: Record<DisputeStatus, string> = {
  open: "bg-red-500 text-white",
  investigating: "bg-blue-500 text-white",
  resolved: "bg-green-500 text-white",
};

export const cancelledByLabel: Record<CancelledBy, string> = {
  customer: "Customer",
  owner: "Owner",
  admin: "Admin",
};

export const cancelledByClass: Record<CancelledBy, string> = {
  customer: "bg-transparent border border-amber-400 text-amber-600",
  owner: "bg-transparent border border-blue-400 text-blue-600",
  admin: "bg-red-500 text-white",
};

export const refundStatusClass: Record<RefundStatus, string> = {
  issued: "bg-green-500 text-white",
  pending: "bg-amber-500 text-white",
  denied: "bg-red-500 text-white",
};
