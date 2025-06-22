// NavItems.tsx
import { cn } from "lib/utils";
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";

export const NavItems = () => {
  const user = {
    name: "Adrian Hajdin",
    email: "adrian@jamster.com",
    imageUrl: "/assets/images/david.webp",
  };

  return (
    <section className="flex flex-col h-full justify-between px-4 py-6 bg-white">
      {/* Logo */}
      <Link to="/" className="flex items-center mb-8">
        <img src="/assets/icons/logo.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="ml-3 text-lg font-bold">Tourvisto</h1>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {sidebarItems.map(({ id, href, label }) => (
          <NavLink key={id} to={href} className="group">
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
      <footer className="flex items-center gap-3 mt-32 pt-6 border-t border-gray-200">
        <img src={user.imageUrl || '/assets/images/david.webp'} alt={user.name} className="w-10 h-10 rounded-full" />
        <div>
          <h2 className="text-sm font-semibold">{user.name}</h2>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </footer>
    </section>
  );
};
