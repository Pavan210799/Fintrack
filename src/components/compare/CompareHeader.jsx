import {
  LuBell,
  LuMoon,
  LuSun,
  LuMenu,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

import './CompareHeader.css';

const CompareHeader = ({
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
    <header className='compare-page-header'>
      <div className='compare-header-left'>
        <button
          className='compare-header-menu-button'
          onClick={openSidebar}
          aria-label='Open sidebar'
        >
          <LuMenu />
        </button>

        <div className='compare-header-title'>
          <h1>Compare</h1>
          <p>
            Compare financial performance between two
            months.
          </p>
        </div>

        <div className='compare-header-divider' />

        <div className='compare-header-date'>
          <span className='compare-header-day'>{day}</span>
          <span className='compare-header-date-text'>
            {date}
          </span>
        </div>
      </div>

      <div className='compare-header-actions'>
        <button
          className='compare-header-icon-button'
          onClick={toggleTheme}
          aria-label='Toggle theme'
        >
          {theme === 'light' ? <LuMoon /> : <LuSun />}
        </button>

        <button
          className='compare-header-icon-button notification-button'
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
          className='compare-header-profile-avatar'
          onClick={() => navigate('/profile')}
          aria-label='Open profile'
        >
          <span>{avatarLetter}</span>
        </button>
      </div>
    </header>
  );
};

export default CompareHeader;