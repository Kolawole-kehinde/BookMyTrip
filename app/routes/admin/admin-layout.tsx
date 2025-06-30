// routes/admin/admin-layout.tsx
import { getExistingUser, storeUserData } from "appwrite/auth";
import { account } from "appwrite/client";
import { MobileSidebar, NavItems } from "components";
import { Outlet, redirect } from "react-router";
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';

// Loader function
export async function clientLoader() {
  try {
    const user = await account.get();

    // If user is not logged in
    if (!user?.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser();

    // If user is not an admin
    if (existingUser?.status === 'user') {
      return redirect("/");
    }

    // If user not found in DB, store new data
    if (!existingUser?.$id) {
      return await storeUserData();
    }

    // Else return user data
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
      <MobileSidebar />

      {/* Desktop Sidebar */}
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white pt-12 lg:pt-6 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
