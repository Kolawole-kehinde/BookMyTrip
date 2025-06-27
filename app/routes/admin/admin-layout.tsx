
import { getExistingUser, storeUserData } from "appwrite/auth";
import { account } from "appwrite/client";
import { MobileSidebar, NavItems } from "components";
import { Outlet, redirect } from "react-router";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user) return redirect("/sign-in");

    let existingUser = await getExistingUser();

    if (!existingUser) {
      existingUser = await storeUserData(); 
    }

    return existingUser;
  } catch (error) {
    console.error("clientLoader error:", error);
    return redirect("/sign-in");
  }
}



const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Desktop Sidebar */}
      <aside className="w-full max-w-[270px] hidden lg:flex flex-col bg-gray-100 border-r border-gray-300">
        <nav className="h-full overflow-y-auto">
          <NavItems />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white pt-12 lg:pt-6 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
