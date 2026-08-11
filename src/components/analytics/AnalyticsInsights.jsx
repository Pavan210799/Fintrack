import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuCreditCard,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import './AnalyticsInsights.css';

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const months = [
  { value: '2026-03', label: 'March 2026' },
  { value: '2026-04', label: 'April 2026' },
  { value: '2026-05', label: 'May 2026' },
  { value: '2026-06', label: 'June 2026' },
  { value: '2026-07', label: 'July 2026' },
  { value: '2026-08', label: 'August 2026' },
];

const AnalyticsInsights = () => {
  const { transactions } = useFinance();

  const monthStats = months.map((month) => {
    const monthTransactions = transactions.filter((t) =>
      t.date.startsWith(month.value)
    );

    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...month,
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
  });

  const bestMonth = monthStats.reduce((best, current) =>
    current.savingsRate > best.savingsRate
      ? current
      : best
  );

  const categoryTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] =
        (acc[transaction.category] || 0) +
        transaction.amount;
      return acc;
    }, {});

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const paymentMethodTotals = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.paymentMethod] =
        (acc[transaction.paymentMethod] || 0) + 1;
      return acc;
    },
    {}
  );

  const topPaymentMethod = Object.entries(
    paymentMethodTotals
  ).sort((a, b) => b[1] - a[1])[0];

  const averageSavingsRate = Math.round(
    monthStats.reduce(
      (sum, month) => sum + month.savingsRate,
      0
    ) / monthStats.length
  );

  const insights = [
    {
      title: 'Best month',
      value: bestMonth.label,
      description: `Highest savings rate of ${bestMonth.savingsRate}%`,
      icon: LuTrendingUp,
      type: 'success',
    },
    {
      title: 'Highest spending category',
      value: topCategory
        ? topCategory[0]
        : 'No data',
      description: topCategory
        ? formatCurrency(topCategory[1])
        : 'No expenses recorded',
      icon: LuTrendingDown,
      type: 'warning',
    },
    {
      title: 'Average savings rate',
      value: `${averageSavingsRate}%`,
      description: 'Across March–August 2026',
      icon: LuWallet,
      type: 'primary',
    },
    {
      title: 'Most used payment method',
      value: topPaymentMethod
        ? topPaymentMethod[0]
        : 'No data',
      description: topPaymentMethod
        ? `${topPaymentMethod[1]} transactions`
        : 'No transactions recorded',
      icon: LuCreditCard,
      type: 'info',
    },
  ];

  return (
    <div className='analytics-insights-card'>
      <div className='analytics-insights-header'>
        <div>
          <h3>Financial insights</h3>
          <p>
            Key observations and trends from your
            financial activity.
          </p>
        </div>
      </div>

      <div className='analytics-insights-grid'>
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <div
              key={insight.title}
              className='analytics-insight-item'
            >
              <div
                className={`analytics-insight-icon ${insight.type}`}
              >
                <Icon />
              </div>

              <div className='analytics-insight-content'>
                <span className='analytics-insight-title'>
                  {insight.title}
                </span>

                <strong>
                  {insight.value}
                </strong>

                <p>
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsInsights;