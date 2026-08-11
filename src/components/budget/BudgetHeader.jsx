import {
  LuBell,
  LuMoon,
  LuSun,
  LuCalendar,
  LuMenu,
} from 'react-icons/lu';

import './BudgetHeader.css';

const BudgetHeader = ({
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
      <header className='budget-header'>
        <div className='budget-left'>
          <button
            className='budget-menu-button'
            onClick={openSidebar}
            aria-label='Open sidebar'
          >
            <LuMenu />
          </button>

          <div className='budget-title'>
            <h1>Budget</h1>
            <p>
              Set monthly budgets and track spending across categories.
            </p>
          </div>

          <div className='budget-divider' />

          <div className='budget-date'>
            <span className='budget-day'>{day}</span>
            <span className='budget-date-text'>{date}</span>
          </div>
        </div>

        <div className='budget-actions'>
          <div className='budget-month-selector budget-desktop-month-selector'>
            <LuCalendar className='budget-action-icon' />

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
            className='budget-icon-button'
            onClick={toggleTheme}
            aria-label='Toggle theme'
          >
            {theme === 'light' ? (
              <LuMoon />
            ) : (
              <LuSun />
            )}
          </button>

          <button className='budget-icon-button'>
            <LuBell />
          </button>

          <div className='budget-profile-avatar'>
            <span>PK</span>
          </div>
        </div>
      </header>

      <div className='budget-mobile-month-selector'>
        <div className='budget-month-selector'>
          <LuCalendar className='budget-action-icon' />
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

export default BudgetHeader;