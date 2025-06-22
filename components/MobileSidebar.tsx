//@ts-nocheck
import { useRef } from 'react';
import { Link } from 'react-router';
import { NavItems } from './NavItems';
import pkg from '@syncfusion/ej2-react-navigations';

const { SidebarComponent } = pkg;

const MobileSidebar = () => {
  const sidebarRef = useRef<SidebarComponent | null>(null);

  const toggleSidebar = () => {
    sidebarRef.current?.toggle();
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header className="flex justify-between items-center px-4 py-3 border-b">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/icons/logo.svg" alt="Logo" className="size-[30px]" />
          <h1 className="font-semibold text-lg">Bookmytrip</h1>
        </Link>

        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <img src="/assets/icons/menu.svg" alt="Menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        width={270}
        ref={sidebarRef}
        created={() => sidebarRef.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="Over"
      >
        <NavItems handleItemClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
