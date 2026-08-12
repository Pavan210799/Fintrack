import {
  LuBell,
  LuMoon,
  LuSun,
  LuCalendar,
  LuMenu,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

import './DashboardHeader.css';

const DashboardHeader = ({
  selectedMonth,
  setSelectedMonth,
  theme,
  toggleTheme,
  openSidebar,
}) => {
  const navigate = useNavigate();

  const { openNotifications, unreadCount } =
    useNotifications();

  const { currentUser } = useAuth();

  const today = new Date();

  const day = today.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const date = today.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const { user } = useAuth();

  const avatarLetter = (
    user?.firstName?.charAt(0) || 'U'
  ).toUpperCase();

  return (
    <>
      <header className='dashboard-header'>
        <div className='dashboard-left'>
          <button
            className='menu-button'
            onClick={openSidebar}
            aria-label='Open sidebar'
          >
            <LuMenu />
          </button>

          <div className='dashboard-title'>
            <h1>Dashboard</h1>
            <p>
              Track your income, expenses, and financial
              goals.
            </p>
          </div>

          <div className='dashboard-divider' />

          <div className='dashboard-date'>
            <span className='dashboard-day'>{day}</span>
            <span className='dashboard-date-text'>
              {date}
            </span>
          </div>
        </div>

        <div className='dashboard-actions'>
          <div className='month-selector desktop-month-selector'>
            <LuCalendar className='action-icon' />

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
            >
              <option value='2026-08'>
                August 2026
              </option>
              <option value='2026-07'>
                July 2026
              </option>
              <option value='2026-06'>
                June 2026
              </option>
              <option value='2026-05'>
                May 2026
              </option>
              <option value='2026-04'>
                April 2026
              </option>
              <option value='2026-03'>
                March 2026
              </option>
            </select>
          </div>

          <button
            className='icon-button'
            onClick={toggleTheme}
            aria-label='Toggle theme'
          >
            {theme === 'light' ? <LuMoon /> : <LuSun />}
          </button>

          <button
            className='icon-button notification-button'
            onClick={openNotifications}
            aria-label='Open notifications'
          >
            <LuBell />

            {unreadCount > 0 && (
              <span className='notification-badge'>
                {unreadCount > 9
                  ? '9+'
                  : unreadCount}
              </span>
            )}
          </button>

          <button
            className='dashboard-profile-avatar'
            onClick={() => navigate('/profile')}
            aria-label='Open profile'
          >
            <span>{avatarLetter}</span>
          </button>
        </div>
      </header>

      <div className='mobile-month-selector'>
        <div className='month-selector'>
          <LuCalendar className='action-icon' />

          <select
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value)
            }
          >
            <option value='2026-08'>
              August 2026
            </option>
            <option value='2026-07'>
              July 2026
            </option>
            <option value='2026-06'>
              June 2026
            </option>
            <option value='2026-05'>
              May 2026
            </option>
            <option value='2026-04'>
              April 2026
            </option>
            <option value='2026-03'>
              March 2026
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;