import {
  LuCalendar,
  LuSearch,
  LuFilter,
  LuWallet,
} from 'react-icons/lu';
import './ExpensesFilters.css';

const categories = [
  'All',
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Income',
];

const paymentMethods = [
  'All',
  'UPI',
  'Card',
  'Cash',
  'Net Banking',
];

const ExpensesFilters = ({
  selectedMonth,
  setSelectedMonth,
  categoryFilter,
  setCategoryFilter,
  paymentMethod,
  setPaymentMethod,
  search,
  setSearch,
}) => {
  return (
    <div className='expenses-filters'>
      <div className='filters-top'>
        <div className='filter-group month-filter'>
          <LuCalendar className='filter-icon' />
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

        <div className='filter-group category-filter'>
          <LuFilter className='filter-icon' />
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className='filter-group search-filter'>
          <LuSearch className='filter-icon' />
          <input
            type='text'
            placeholder='Search transactions...'
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      <div className='filters-bottom'>
        <div className='filters-bottom-label'>
          <LuWallet className='filter-icon' />
          <span>Payment method</span>
        </div>

        <div className='method-buttons'>
          {paymentMethods.map((method) => (
            <button
              key={method}
              type='button'
              className={
                paymentMethod === method
                  ? 'method-btn active'
                  : 'method-btn'
              }
              onClick={() =>
                setPaymentMethod(method)
              }
            >
              {method}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesFilters;