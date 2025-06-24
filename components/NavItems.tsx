import { cn } from "lib/utils";
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";

export const NavItems = ({ handleItemClick }: { handleItemClick?: () => void }) => {
  const user = {
    name: "Khennycool",
    email: "khennycool@gmail.com",
    imageUrl: "/assets/images/david.webp",
  };

  return (
    <section className="flex flex-col h-full px-4 py-6 bg-white">
      {/* Logo */}
      <Link to="/" className="flex items-center mb-6">
        <img src="/assets/icons/logo.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="ml-3 text-lg font-bold">Bookmytrip</h1>
      </Link>

      {/* Navigation */}
      <nav className="container">
        {sidebarItems?.map(({ id, href, label, icon }) => (
          <NavLink key={id} to={href}>
            {({ isActive }: { isActive: boolean }) => (
              <div className={cn('group nav-item', {
                'bg-primary-100 !text-white': isActive,
              })} onClick={handleItemClick}>
                <img src={icon} alt={label}  className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? "brightness-0 invert" : "text-dark-200"}`}/>
                <span className="ml-2 text-sm font-medium">{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <footer className="flex items-center mt-56 gap-3 border-t border-gray-200 pt-4">
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
          onClick={() => {
            console.log("Logout clicked");
          }}
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
