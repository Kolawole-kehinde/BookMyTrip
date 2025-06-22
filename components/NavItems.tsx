// NavItems.tsx
import { cn } from "lib/utils";
import { NavLink } from "react-router";
import { sidebarItems } from "~/constants";

export const NavItems = ({ handleClick }: { handleClick?: () => void }) => {
  const user = {
    name: "Khennycool",
    email: "khennycool@gmail.com",
    imageUrl: "/assets/images/david.webp",
  };

  return (
    <section className="flex flex-col h-full px-4 py-6 bg-white">
      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 border-t border-gray-200 pt-4">
        {sidebarItems.map(({ id, href, label }) => (
          <NavLink key={id} to={href} className="group" onClick={handleClick}>
            {({ isActive }) => (
              <div
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg transition",
                  "text-gray-700 hover:bg-blue-500 hover:text-white",
                  isActive && "bg-blue-500 text-white"
                )}
              >
                <span className="ml-2 text-sm font-medium">{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <footer className="flex items-center mt-32 gap-3 border-t border-gray-200 pt-4">
        <img
          src={user.imageUrl}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h2 className="text-sm font-semibold truncate">{user.name}</h2>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
        <button
          onClick={() => console.log("Logout clicked")}
          aria-label="Logout"
        >
          <img
            src="/assets/icons/logout.svg"
            alt="Logout"
            className="w-5 h-5"
          />
        </button>
      </footer>
    </section>
  );
};
export default NavItems;