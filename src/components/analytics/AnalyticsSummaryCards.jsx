import {
  LuTrendingUp,
  LuTrendingDown,
  LuPiggyBank,
  LuWallet,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import './AnalyticsSummaryCards.css';

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const getPreviousMonth = (month) => {
  const [year, m] = month.split('-').map(Number);
  const date = new Date(year, m - 2, 1);

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}`;
};

const AnalyticsSummaryCards = ({ selectedMonth }) => {
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
      savingsRate:
        income > 0
          ? Math.round(
              ((income - expenses) / income) * 100
            )
          : 0,
    };
  };

  const current = calculateMonthData(selectedMonth);
  const previous = calculateMonthData(
    getPreviousMonth(selectedMonth)
  );

  const availableMonths = [
    '2026-03',
    '2026-04',
    '2026-05',
    '2026-06',
    '2026-07',
    '2026-08',
  ];

  const monthlyData = availableMonths.map((month) =>
    calculateMonthData(month)
  );

  const averageExpense =
    monthlyData.reduce(
      (sum, month) => sum + month.expenses,
      0
    ) / monthlyData.length;

  const averageIncome =
    monthlyData.reduce(
      (sum, month) => sum + month.income,
      0
    ) / monthlyData.length;

  const savingsRateChange =
    current.savingsRate - previous.savingsRate;

  const expenseTrend =
    previous.expenses > 0
      ? (
          ((current.expenses - previous.expenses) /
            previous.expenses) *
          100
        ).toFixed(1)
      : '0.0';

  const cards = [
    {
      title: 'Average monthly income',
      value: formatCurrency(Math.round(averageIncome)),
      change: 'Last 6 months',
      icon: LuTrendingUp,
      type: 'income',
    },
    {
      title: 'Average monthly expense',
      value: formatCurrency(Math.round(averageExpense)),
      change: 'Last 6 months',
      icon: LuTrendingDown,
      type: 'expense',
    },
    {
      title: 'Savings rate',
      value: `${current.savingsRate}%`,
      change: `${savingsRateChange >= 0 ? '+' : ''}${savingsRateChange}% vs previous month`,
      icon: LuPiggyBank,
      type: 'savings',
    },
    {
      title: 'Net cash flow',
      value: formatCurrency(current.savings),
      change: `${expenseTrend.startsWith('-') ? '' : '+'}${expenseTrend}% expense trend`,
      icon: LuWallet,
      type: 'balance',
    },
  ];

  return (
    <div className='analytics-summary-cards'>
      {cards.map(
        ({
          title,
          value,
          change,
          icon: Icon,
          type,
        }) => (
          <div key={title} className='analytics-summary-card'>
            <div className='analytics-summary-top'>
              <div>
                <p className='analytics-summary-title'>
                  {title}
                </p>

                <h3>{value}</h3>
              </div>

              <div
                className={`analytics-summary-icon ${type}`}
              >
                <Icon />
              </div>
            </div>

            <div className='analytics-summary-footer'>
              <span className='analytics-summary-change'>
                {change}
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AnalyticsSummaryCards;