import { NavLink } from 'react-router-dom';
import {
  LuLayoutDashboard,
  LuReceipt,
  LuWallet,
  LuCircleDollarSign,
  LuFileText,
  LuSettings,
  LuX,
} from 'react-icons/lu';

import logo from '../../assets/images/logo/logo.png';
import sidebarImage from '../../assets/images/sidebarImage.png';

import './Sidebar.css';

const menuItems = [
  { label: 'Dashboard', icon: LuLayoutDashboard, path: '/' },
  { label: 'Expenses', icon: LuReceipt, path: '/expenses' },
  { label: 'Budget', icon: LuWallet, path: '/budget' },
  { label: 'Analytics', icon: LuCircleDollarSign, path: '/analytics' },
  { label: 'Compare', icon: LuFileText, path: '/compare' },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='sidebar-top'>
        <div className='logo-section'>
          <img src={logo} alt='FinTrack Logo' className='logo' />
          <h2 className='logo-text'>FinTrack</h2>

          <button
            className='sidebar-close'
            onClick={closeSidebar}
            aria-label='Close sidebar'
          >
            <LuX />
          </button>
        </div>

        <hr className='sidebar-divider' />

        <nav className='sidebar-nav'>
          {menuItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
              onClick={closeSidebar}
            >
              <Icon className='nav-icon' />
              <span className='nav-text'>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className='sidebar-card'>
        <img
          src={sidebarImage}
          alt='Finance Illustration'
          className='sidebar-image'
        />
        <h4>Take control of your finances</h4>
        <p>
          Track expenses, monitor budgets, and grow your savings with smart
          financial insights.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;