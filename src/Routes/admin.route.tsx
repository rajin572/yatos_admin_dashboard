import UserManagementPage from "@/pages/UserManagement/UserManagementPage";
import OverviewPage from "@/pages/Overview/Overview";
import OwnerManagementPage from "@/pages/OwnerManagement/OwnerManagementPage";
import ListingsPage from "@/pages/Listings/ListingsPage";
import AdvertisementsPage from "@/pages/Advertisements/AdvertisementsPage";
import BookingsDisputesPage from "@/pages/BookingsDisputes/BookingsDisputesPage";
import PaymentsPayoutsPage from "@/pages/PaymentsPayouts/PaymentsPayoutsPage";
import ReviewsRatingsPage from "@/pages/ReviewsRatings/ReviewsRatingsPage";
import ReportsAnalyticsPage from "@/pages/ReportsAnalytics/ReportsAnalyticsPage";
import AdminTeamPage from "@/pages/AdminTeam/AdminTeamPage";
import LegalDocumentsPage from "@/pages/LegalDocuments/LegalDocumentsPage";

import {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  Megaphone,
  CalendarClock,
  Wallet,
  Star,
  BarChart3,
  ShieldCheck,
  FileText,
} from "lucide-react";

export const adminRoutes = [
  {
    title: "",
    items: [
      {
        title: "Dashboard",
        url: "overview",
        icon: LayoutDashboard,
        element: <OverviewPage />,
      },
      {
        title: "User Management",
        url: "user-management",
        icon: Users,
        element: <UserManagementPage />,
      },
      {
        title: "Owner Management",
        url: "owner-management",
        icon: UserCog,
        element: <OwnerManagementPage />,
      },
      {
        title: "Listings",
        url: "listings",
        icon: Building2,
        element: <ListingsPage />,
      },
      {
        title: "Advertisements",
        url: "advertisements",
        icon: Megaphone,
        element: <AdvertisementsPage />,
      },
      {
        title: "Bookings & Disputes",
        url: "bookings-disputes",
        icon: CalendarClock,
        element: <BookingsDisputesPage />,
      },
      {
        title: "Payments & Payouts",
        url: "payments-payouts",
        icon: Wallet,
        element: <PaymentsPayoutsPage />,
      },
      {
        title: "Reviews & Ratings",
        url: "reviews-ratings",
        icon: Star,
        element: <ReviewsRatingsPage />,
      },
      {
        title: "Reports & Analytics",
        url: "reports-analytics",
        icon: BarChart3,
        element: <ReportsAnalyticsPage />,
      },
      {
        title: "Admin Team",
        url: "admin-team",
        icon: ShieldCheck,
        element: <AdminTeamPage />,
      },
      {
        title: "Legal Documents",
        url: "legal-documents",
        icon: FileText,
        element: <LegalDocumentsPage />,
      },
    ],
  },
];
