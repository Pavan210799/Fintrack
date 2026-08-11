import {
  LuBell,
  LuMoon,
  LuSun,
  LuMenu,
} from 'react-icons/lu';

import './CompareHeader.css';

const CompareHeader = ({
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
            Compare financial performance between two months.
          </p>
        </div>

        <div className='compare-header-divider' />

        <div className='compare-header-date'>
          <span className='compare-header-day'>{day}</span>
          <span className='compare-header-date-text'>{date}</span>
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
          className='compare-header-icon-button'
          aria-label='Notifications'
        >
          <LuBell />
        </button>

        <div className='compare-header-profile-avatar'>
          <span>PK</span>
        </div>
      </div>
    </header>
  );
};

export default CompareHeader;