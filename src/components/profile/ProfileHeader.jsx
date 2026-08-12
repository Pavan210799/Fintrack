import {
  LuBell,
  LuMoon,
  LuSun,
  LuMenu,
} from 'react-icons/lu';

import { useNotifications } from '../../context/NotificationContext';

import './ProfileHeader.css';

const ProfileHeader = ({
  theme,
  toggleTheme,
  openSidebar,
}) => {
  const today = new Date();

  const day = today.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const date = today.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const {
    unreadCount,
    openNotifications,
  } = useNotifications();

  return (
    <header className='profile-header'>
      <div className='profile-header-left'>
        <button
          className='profile-menu-button'
          onClick={openSidebar}
          aria-label='Open sidebar'
        >
          <LuMenu />
        </button>

        <div className='profile-header-title'>
          <h1>Profile</h1>
          <p>
            Manage your account details,
            preferences, and payment methods.
          </p>
        </div>

        <div className='profile-header-divider' />

        <div className='profile-header-date'>
          <span className='profile-header-day'>
            {day}
          </span>
          <span className='profile-header-date-text'>
            {date}
          </span>
        </div>
      </div>

      <div className='profile-header-actions'>
        <button
          className='profile-header-icon-button'
          onClick={toggleTheme}
          aria-label='Toggle theme'
        >
          {theme === 'light' ? (
            <LuMoon />
          ) : (
            <LuSun />
          )}
        </button>

        <button
          className='profile-header-icon-button notification-button'
          onClick={openNotifications}
          aria-label='Notifications'
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

      </div>
    </header>
  );
};

export default ProfileHeader;