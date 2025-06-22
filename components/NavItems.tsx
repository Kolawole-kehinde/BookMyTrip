import { cn } from "~/lib/utils";
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";

type SidebarItem = {
  id: number;
  icon: string;
  label: string;
  href: string;
  noIcon?: boolean;
};

const NavItems = () => {
  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img 
          src="/assets/icons/logo.svg" 
          alt="Logo" 
          className="w-[30px] h-[30px]" 
        />
        <h1 className="ml-2 text-xl font-bold">BookMyTrip</h1>
      </Link>

      {/* Use flex column with vertical gap between items */}
      <nav className="mt-4 flex flex-col gap-y-3">
        {sidebarItems.map(({ id, href, label }: SidebarItem) => (
          <NavLink to={href} key={id} className="group">
            {({ isActive }) => (
              <div
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg transition",
                  "text-dark-200 hover:bg-primary-100 hover:text-white",
                  isActive && "bg-primary-100 text-white"
                )}
              >
                <span className="text-sm font-medium">{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </section>
  );
};

export default NavItems;
