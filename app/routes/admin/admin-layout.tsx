import { getExistingUser, storeUserData } from "appwrite/auth";
import { account } from "appwrite/client";
import { MobileSidebar, NavItems } from "components";
import { Outlet, redirect} from "react-router";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user?.$id) return redirect('/sign-in');

    const existingUser = await getExistingUser(); 

    if (existingUser?.status === 'user') {
      return redirect('/');
    }

    return existingUser?.$id ? existingUser : await storeUserData();

  } catch (e) {
    console.error('Error in clientLoader', e);
    return redirect('/sign-in');
  }
}

const AdminLayout = () => {
  
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Desktop Sidebar */}
      <aside className="w-full max-w-[270px] hidden lg:flex flex-col bg-gray-100 border-r border-gray-300" aria-label="Sidebar">
        <nav className="h-full overflow-y-auto">
          <NavItems />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full h-full bg-light-200 pt-12 lg:pt-6 overflow-y-auto" role="main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
