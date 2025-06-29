// NavItems.tsx

import { logoutUser } from "appwrite/auth";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router";
import { sidebarItems } from "~/constants";

export const NavItems = ({
  handleItemClick,
}: {
  handleItemClick?: () => void;
}) => {
  const user = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <section className="flex flex-col h-full px-4 py-6 bg-white">
      {/* Logo */}
      <Link to="/" className="flex items-center mb-6">
        <img src="/assets/icons/BookMyTrip.png" alt="Logo" className="w-8 h-8" />
        <h1 className="ml-3 text-lg font-bold">BookMyTrip</h1>
      </Link>

      {/* Navigation */}
      <nav className="container flex flex-col gap-2">
        {sidebarItems?.map(({ id, href, label }) => (
          <NavLink key={id} to={href}>
            {({ isActive }: { isActive: boolean }) => (
              <div
                tabIndex={0}
                className={`group nav-item flex items-center cursor-pointer px-3 py-2 rounded-md select-none ${
                  isActive ? "bg-primary-100 !text-white" : ""
                }`}
                onClick={handleItemClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick?.();
                  }
                }}
              >
                <span className="ml-2 text-sm font-medium">{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <footer className="flex items-center mt-auto gap-3 border-t border-gray-200 pt-4">
        <img
          src={user?.imageUrl || "./assets/images/david.webp"}
          alt={user?.name || "Khennycool"}
          className="w-10 h-10 rounded-full"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1">
          <h2 className="text-sm font-semibold truncate">{user?.name}</h2>
          <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
        </div>
        <button onClick={handleLogout} aria-label="Logout" className="p-1">
          <img
            src="/assets/icons/logout.svg"
            alt="Logout"
            className="size-4"
          />
        </button>
      </footer>
    </section>
  );
};
