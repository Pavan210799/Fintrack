import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className='layout'>
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />

      {isSidebarOpen && (
        <div
          className='sidebar-overlay'
          onClick={closeSidebar}
        />
      )}

      <main className='layout-content'>
        <Outlet context={{ openSidebar }} />
      </main>
    </div>
  );
};

export default DashboardLayout;