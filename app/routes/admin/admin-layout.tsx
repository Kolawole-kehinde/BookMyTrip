// routes/admin/admin-layout.tsx
import { getExistingUser, storeUserData } from "appwrite/auth";
import { account } from "appwrite/client";
import { MobileSidebar, NavItems } from "components";
import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

// Loader function
export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user?.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser();

    if (existingUser?.status === "user") return redirect("/");

    if (!existingUser?.$id) {
      return await storeUserData();
    }

    return existingUser;
  } catch (error) {
    console.error("clientLoader error:", error);
    return redirect("/sign-in");
  }
}

// Layout component
const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50">
        <MobileSidebar />
      </div>

      {/* Push content down to avoid overlap with mobile sidebar */}
      <div className="pt-16 lg:pt-0 flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-[270px] flex-shrink-0 border-r border-gray-200 h-full">
          <SidebarComponent width={270} enableGestures={false}>
            <NavItems />
          </SidebarComponent>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
