
import syncfusionNavigation from "@syncfusion/ej2-react-navigations";
import { NavItems } from "components/NavItems";
import { Outlet } from "react-router";
const { SidebarComponent } = syncfusionNavigation;


const AdminLayout = () => {

  return (
    <div className="admin-layout flex h-screen">
      <aside className="hidden lg:block">
        <SidebarComponent
          width="270px"
          enableGestures={false}
        >
          <NavItems />
        </SidebarComponent>
      </aside>
      <div className="main-content flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
