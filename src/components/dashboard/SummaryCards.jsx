import {
  LuWallet,
  LuArrowDownLeft,
  LuArrowUpRight,
  LuPiggyBank,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import './SummaryCards.css';

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const getPreviousMonth = (month) => {
  const [year, m] = month.split('-').map(Number);
  const date = new Date(year, m - 2, 1);

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}`;
};

const getChange = (current, previous) => {
  if (previous === 0) return '+0%';

  const percentage =
    ((current - previous) / previous) * 100;

  const sign = percentage >= 0 ? '+' : '';

  return `${sign}${percentage.toFixed(1)}%`;
};

const SummaryCards = ({ selectedMonth }) => {
  const { transactions } = useFinance();

  const calculateMonthData = (month) => {
    const monthTransactions = transactions.filter((t) =>
      t.date.startsWith(month)
    );

    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      savings: income - expenses,
    };
  };

  const current = calculateMonthData(selectedMonth);
  const previous = calculateMonthData(
    getPreviousMonth(selectedMonth)
  );

  // Running balance up to the selected month
  const totalBalance = transactions
    .filter((t) => t.date <= `${selectedMonth}-31`)
    .reduce((balance, t) => {
      return t.type === 'income'
        ? balance + t.amount
        : balance - t.amount;
    }, 0);

  const cards = [
    {
      title: 'Total Balance',
      amount: formatCurrency(totalBalance),
      change: getChange(
        totalBalance,
        totalBalance - current.savings
      ),
      icon: LuWallet,
      type: 'balance',
    },
    {
      title: 'Income',
      amount: formatCurrency(current.income),
      change: getChange(
        current.income,
        previous.income
      ),
      icon: LuArrowDownLeft,
      type: 'income',
    },
    {
      title: 'Expenses',
      amount: formatCurrency(current.expenses),
      change: getChange(
        current.expenses,
        previous.expenses
      ),
      icon: LuArrowUpRight,
      type: 'expense',
    },
    {
      title: 'Savings',
      amount: formatCurrency(current.savings),
      change: getChange(
        current.savings,
        previous.savings
      ),
      icon: LuPiggyBank,
      type: 'savings',
    },
  ];

  return (
    <div className='summary-cards'>
      {cards.map(
        ({ title, amount, change, icon: Icon, type }) => (
          <div key={title} className='summary-card'>
            <div className='summary-card-top'>
              <div>
                <p className='summary-title'>{title}</p>
                <h3>{amount}</h3>
              </div>

              <div className={`summary-icon ${type}`}>
                <Icon />
              </div>
            </div>

            <div className='summary-footer'>
              <span
                className={`summary-change ${
                  change.startsWith('-')
                    ? 'negative'
                    : 'positive'
                }`}
              >
                {change}
              </span>

              <span className='summary-period'>
                vs last month
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SummaryCards;