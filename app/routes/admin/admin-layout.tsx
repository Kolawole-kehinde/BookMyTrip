import syncfusionNavigation from "@syncfusion/ej2-react-navigations";
const { SidebarComponent } = syncfusionNavigation;

import { NavItems } from "components";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* MobileSidebar */}
      <aside className="w-full max-w-[270px] hidden lg:block">
         <SidebarComponent width={270} enableGestures={false}>
        <NavItems />
      </SidebarComponent>
      </aside>

      {/* Main Content */}
      <aside>
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
