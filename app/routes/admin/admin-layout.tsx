import { MobileSidebar, NavItems } from "components";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Desktop Sidebar */}
      <aside className="w-full max-w-[270px] hidden lg:flex flex-col bg-gray-100 border-r border-gray-300">
        <div className="h-full overflow-y-auto">
          <NavItems />
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full h-full bg-light-200 pt-12 lg:pt-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
