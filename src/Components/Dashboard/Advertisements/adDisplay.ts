import { AdPlacement, AdStatus } from "@/types";

export const placementLabel: Record<AdPlacement, string> = {
  home_carousel: "Home carousel",
  search_feed: "Search feed",
};

export const statusBadgeClass: Record<AdStatus, string> = {
  active: "bg-green-500 text-white",
  paused: "bg-purple-500 text-white",
  scheduled: "bg-blue-500 text-white",
  ended: "bg-gray-400 text-white",
};
