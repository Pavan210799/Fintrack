import {
  LuBell,
  LuMoon,
  LuSun,
  LuCalendar,
  LuMenu,
} from 'react-icons/lu';

import './AnalyticsHeader.css';

const AnalyticsHeader = ({
  selectedMonth,
  setSelectedMonth,
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

  return (
    <>
      <header className='analytics-header'>
        <div className='analytics-left'>
          <button
            className='analytics-menu-button'
            onClick={openSidebar}
            aria-label='Open sidebar'
          >
            <LuMenu />
          </button>

          <div className='analytics-title'>
            <h1>Analytics</h1>
            <p>
              Explore spending trends, income patterns, and financial insights.
            </p>
          </div>

          <div className='analytics-divider' />

          <div className='analytics-date'>
            <span className='analytics-day'>{day}</span>
            <span className='analytics-date-text'>{date}</span>
          </div>
        </div>

        <div className='analytics-actions'>
          <div className='analytics-month-selector analytics-desktop-month-selector'>
            <LuCalendar className='analytics-action-icon' />

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value='2026-08'>August 2026</option>
              <option value='2026-07'>July 2026</option>
              <option value='2026-06'>June 2026</option>
              <option value='2026-05'>May 2026</option>
              <option value='2026-04'>April 2026</option>
              <option value='2026-03'>March 2026</option>
            </select>
          </div>

          <button
            className='analytics-icon-button'
            onClick={toggleTheme}
            aria-label='Toggle theme'
          >
            {theme === 'light' ? <LuMoon /> : <LuSun />}
          </button>

          <button className='analytics-icon-button'>
            <LuBell />
          </button>

          <div className='analytics-profile-avatar'>
            <span>PK</span>
          </div>
        </div>
      </header>

      <div className='analytics-mobile-month-selector'>
        <div className='analytics-month-selector'>
          <LuCalendar className='analytics-action-icon' />

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value='2026-08'>August 2026</option>
            <option value='2026-07'>July 2026</option>
            <option value='2026-06'>June 2026</option>
            <option value='2026-05'>May 2026</option>
            <option value='2026-04'>April 2026</option>
            <option value='2026-03'>March 2026</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default AnalyticsHeader;