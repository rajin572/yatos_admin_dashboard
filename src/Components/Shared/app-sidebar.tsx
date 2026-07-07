import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { adminRoutes } from "@/Routes/admin.route";
import { AllImages } from "@/assets/AllImages";
import { IJwtPayload } from "@/types";

export function AppSidebar() {
  const userData = {
    userId: "1234567890",
    fullName: "John Doe",
    email: "RcOwT@example.com",
    role: "Admin",
    profileImage: AllImages.profile,
    phone: "1234567890",
  } as IJwtPayload | null;
  // const userData: IJwtPayload | null = useUserData();
  return (
    <Sidebar collapsible={"icon"} variant={"sidebar"}>
      <SidebarHeader className="overflow-hidden">
        <div className="flex items-start justify-center w-fit mx-auto">
          <img src={AllImages.logo} alt="logo" className="max-w-40" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {adminRoutes?.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t-2 border-[#FFFFFF1A]">
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
