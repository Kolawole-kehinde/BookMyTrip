//@ts-nocheck
import pkg from "@syncfusion/ej2-react-navigations";
import { useRef } from "react";
import { Link } from "react-router";
import { RiMenu2Fill } from "react-icons/ri";
import { NavItems } from "./NavItems";

const { SidebarComponent } = pkg;

const MobileSidebar = () => {
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    sidebarRef.current?.toggle();
  };

  return (
    <div className="mobile-sidebar wrapper lg:hidden">
      <header className="flex justify-between items-center py-4 border-b border-light-100">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/icons/logo.svg" alt="Logo" className="w-[30px] h-[30px]" />
          <h1 className="text-lg font-bold">Bookmytrip</h1>
        </Link>
        <button onClick={toggleSidebar} aria-label="Toggle sidebar">
          <RiMenu2Fill fontSize={30} />
        </button>
      </header>

      <SidebarComponent
        ref={sidebarRef}
        width="270px"
        created={() => sidebarRef.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="Over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
