import { useState } from "react";
import { NavItems } from "components";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      {/* Top nav bar */}
      <header className="flex items-center justify-between border-b border-gray-300 p-4">
        <div className="flex items-center gap-2">
          <img
            src="/assets/icons/logo.svg"
            alt="BookMyTrip Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-lg font-semibold">BookMyTrip</h1>
        </div>
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          className="p-2"
        >
          {isOpen ? (
            <AiOutlineClose className="w-6 h-6" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Slide-in sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center gap-2 p-4 border-b border-gray-300">
          <img
            src="/assets/icons/logo.svg"
            alt="BookMyTrip Logo"
            className="w-8 h-8 object-contain"
          />
          <h2 className="text-lg font-semibold">BookMyTrip</h2>
        </div>

        <aside className="p-4 overflow-y-auto">
          <NavItems handleItemClick={closeSidebar} />
        </aside>
      </aside>
    </div>
  );
};

export default MobileSidebar;
