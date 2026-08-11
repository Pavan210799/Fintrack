import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className='layout'>
      <Sidebar />
      <main className='layout-content'>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;