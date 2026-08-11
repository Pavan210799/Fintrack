import {
  LuBell,
  LuMoon,
  LuSun,
  LuCalendar,
} from 'react-icons/lu';

import './DashboardHeader.css';

const DashboardHeader = ({
  selectedMonth,
  setSelectedMonth,
  theme,
  toggleTheme,
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

  return (
    <header className='dashboard-header'>
      <div className='dashboard-left'>
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
          </select>
        </div>

        <button
          className='icon-button'
          onClick={toggleTheme}
          aria-label='Toggle theme'
        >
          {theme === 'light' ? <LuMoon /> : <LuSun />}
        </button>

        <button className='icon-button'>
          <LuBell />
        </button>

        <div className='profile-avatar'>
          <span>PK</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;