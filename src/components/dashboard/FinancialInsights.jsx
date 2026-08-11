import {
  LuTrendingUp,
  LuWallet,
  LuReceipt,
  LuCalendar,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import './FinancialInsights.css';

const FinancialInsights = ({ selectedMonth }) => {
  const { transactions } = useFinance();

  const monthTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  const expenses = monthTransactions.filter(
    (t) => t.type === 'expense'
  );

  const income = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = expenses.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const highestTransaction = [...expenses].sort(
    (a, b) => b.amount - a.amount
  )[0];

  const averageDailySpend =
    expenses.length > 0
      ? Math.round(totalExpenses / expenses.length)
      : 0;

  const savingsRate =
    income > 0
      ? Math.round(
          ((income - totalExpenses) / income) * 100
        )
      : 0;

  const monthLabel = new Date(
    `${selectedMonth}-01`
  ).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='insights-card'>
      <div className='insights-header'>
        <h3>Financial insights</h3>
        <span className='insights-badge'>
          {monthLabel}
        </span>
      </div>

      <div className='insights-grid'>
        <div className='insight-box'>
          <div className='insight-top'>
            <span className='insight-label'>
              Top category
            </span>
            <LuTrendingUp className='insight-icon purple' />
          </div>

          <h4>{topCategory?.[0] || 'N/A'}</h4>
          <p>
            ₹
            {(
              topCategory?.[1] || 0
            ).toLocaleString('en-IN')}{' '}
            spent
          </p>

          <div className='insight-progress'>
            <div
              className='insight-progress-fill orange'
              style={{
                width: topCategory
                  ? `${Math.min(
                      (topCategory[1] /
                        totalExpenses) *
                        100,
                      100
                    )}%`
                  : '0%',
              }}
            />
          </div>
        </div>

        <div className='insight-box'>
          <div className='insight-top'>
            <span className='insight-label'>
              Savings rate
            </span>
            <LuWallet className='insight-icon green' />
          </div>

          <h4>{savingsRate}%</h4>
          <p>
            ₹
            {(
              income - totalExpenses
            ).toLocaleString('en-IN')}{' '}
            saved this month
          </p>

          <div className='insight-progress'>
            <div
              className='insight-progress-fill green'
              style={{
                width: `${Math.max(
                  0,
                  Math.min(savingsRate, 100)
                )}%`,
              }}
            />
          </div>
        </div>

        <div className='insight-box'>
          <div className='insight-top'>
            <span className='insight-label'>
              Highest expense
            </span>
            <LuReceipt className='insight-icon orange' />
          </div>

          <h4>
            {highestTransaction?.title ||
              'No expenses'}
          </h4>
          <p>
            ₹
            {(
              highestTransaction?.amount || 0
            ).toLocaleString('en-IN')}{' '}
            {highestTransaction &&
              `on ${new Date(
                highestTransaction.date
              ).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
              })}`}
          </p>
        </div>

        <div className='insight-box'>
          <div className='insight-top'>
            <span className='insight-label'>
              Daily average
            </span>
            <LuCalendar className='insight-icon blue' />
          </div>

          <h4>
            ₹
            {averageDailySpend.toLocaleString('en-IN')}
          </h4>
          <p>
            Based on {expenses.length} expense
            transactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsights;