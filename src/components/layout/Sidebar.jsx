import { NavLink } from 'react-router-dom';
import {
  LuLayoutDashboard,
  LuReceipt,
  LuWallet,
  LuChartColumn,
  LuFileText,
  LuSettings,
} from 'react-icons/lu';

import './Sidebar.css';

const menuItems = [
  { label: 'Dashboard', icon: LuLayoutDashboard, path: '/' },
  { label: 'Expenses', icon: LuReceipt, path: '/expenses' },
  { label: 'Budgets', icon: LuWallet, path: '/budgets' },
  { label: 'Analytics', icon: LuChartColumn, path: '/analytics' },
  { label: 'Reports', icon: LuFileText, path: '/reports' },
  { label: 'Settings', icon: LuSettings, path: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-logo'>
        <div className='logo-icon'>F</div>
        <h2>FinTrack</h2>
      </div>

      <div className='sidebar-divider' />

      <nav className='sidebar-nav'>
        {menuItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <Icon className='nav-icon' />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className='sidebar-promo'>
        <div className='promo-illustration'>📈</div>
        <h3>Take control of your finances</h3>
        <p>
          Track expenses, monitor budgets, and grow your savings with smart
          financial insights.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;