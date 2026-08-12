import {
  LuBell,
  LuMoon,
  LuSun,
  LuPlus,
  LuMenu,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

import './ExpensesHeader.css';

const ExpensesHeader = ({
  theme,
  toggleTheme,
  openSidebar,
  onAddTransaction,
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
    <header className='expenses-header'>
      <div className='expenses-left'>
        <button
          className='expenses-menu-button'
          onClick={openSidebar}
          aria-label='Open sidebar'
        >
          <LuMenu />
        </button>

        <div className='expenses-title'>
          <h1>Expenses</h1>
          <p>
            Manage your income and expense transactions.
          </p>
        </div>

        <div className='expenses-divider' />

        <div className='expenses-date'>
          <span className='expenses-day'>{day}</span>
          <span className='expenses-date-text'>
            {date}
          </span>
        </div>
      </div>

      <div className='expenses-actions'>
        <button
          className='add-transaction-btn'
          onClick={onAddTransaction}
        >
          <LuPlus />
          <span>Transaction</span>
        </button>

        <button
          className='expenses-icon-button'
          onClick={toggleTheme}
          aria-label='Toggle theme'
        >
          {theme === 'light' ? <LuMoon /> : <LuSun />}
        </button>

        <button
          className='expenses-icon-button notification-button'
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
          className='expenses-profile-avatar'
          onClick={() => navigate('/profile')}
          aria-label='Open profile'
        >
          <span>{avatarLetter}</span>
        </button>
      </div>
    </header>
  );
};

export default ExpensesHeader;