import {
  LuBell,
  LuMoon,
  LuSun,
  LuPlus,
  LuMenu,
} from 'react-icons/lu';

import './ExpensesHeader.css';

const ExpensesHeader = ({
  theme,
  toggleTheme,
  openSidebar,
  onAddTransaction,
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

        <button className='expenses-icon-button'>
          <LuBell />
        </button>

        <div className='expenses-profile-avatar'>
          <span>PK</span>
        </div>
      </div>
    </header>
  );
};

export default ExpensesHeader;