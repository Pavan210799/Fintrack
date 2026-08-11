import { useMemo } from 'react';
import {
  LuTrendingDown,
  LuWallet,
  LuArrowLeftRight,
  LuPercent,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import './CompareTable.css';

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const CompareTable = ({
  leftMonth,
  rightMonth,
  months,
  onLeftChange,
  onRightChange,
}) => {
  const { transactions } = useFinance();

  const getMonthStats = (month) => {
    const monthTransactions = transactions.filter((t) =>
      t.date.startsWith(month)
    );

    const incomeTransactions = monthTransactions.filter(
      (t) => t.type === 'income'
    );

    const expenseTransactions = monthTransactions.filter(
      (t) => t.type === 'expense'
    );

    const income = incomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const expenses = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const savings = income - expenses;

    const avgExpense =
      expenseTransactions.length > 0
        ? Math.round(expenses / expenseTransactions.length)
        : 0;

    const highestExpense =
      expenseTransactions.length > 0
        ? Math.max(...expenseTransactions.map((t) => t.amount))
        : 0;

    const topCategory = expenseTransactions.reduce(
      (acc, t) => {
        acc[t.category] =
          (acc[t.category] || 0) + t.amount;
        return acc;
      },
      {}
    );

    const highestCategory =
      Object.entries(topCategory).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || '-';

    const paymentMethods =
      monthTransactions.reduce((acc, t) => {
        acc[t.paymentMethod] =
          (acc[t.paymentMethod] || 0) + 1;
        return acc;
      }, {});

    const topPaymentMethod =
      Object.entries(paymentMethods).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || '-';

    const savingsRate =
      income > 0
        ? Math.round((savings / income) * 100)
        : 0;

    const expenseRatio =
      income > 0
        ? Math.round((expenses / income) * 100)
        : 0;

    return {
      income,
      expenses,
      savings,
      netCashFlow: savings,
      transactionCount: monthTransactions.length,
      avgExpense,
      highestExpense,
      highestCategory,
      topPaymentMethod,
      savingsRate,
      expenseRatio,
    };
  };

  const leftStats = useMemo(
    () => getMonthStats(leftMonth),
    [transactions, leftMonth]
  );

  const rightStats = useMemo(
    () => getMonthStats(rightMonth),
    [transactions, rightMonth]
  );

  const leftMonthLabel =
    months.find((m) => m.value === leftMonth)?.label || 'Month A';

  const rightMonthLabel =
    months.find((m) => m.value === rightMonth)?.label || 'Month B';

  const getColor = (
    left,
    right,
    higherIsBetter = true
  ) => {
    if (left === right) return 'neutral';

    if (higherIsBetter) {
      return left > right ? 'better' : 'worse';
    }

    return left < right ? 'better' : 'worse';
  };

  const rows = [
    {
      label: 'Total income',
      left: leftStats.income,
      right: rightStats.income,
      format: 'currency',
      better: true,
    },
    {
      label: 'Total expenses',
      left: leftStats.expenses,
      right: rightStats.expenses,
      format: 'currency',
      better: false,
    },
    {
      label: 'Savings',
      left: leftStats.savings,
      right: rightStats.savings,
      format: 'currency',
      better: true,
    },
    {
      label: 'Net cash flow',
      left: leftStats.netCashFlow,
      right: rightStats.netCashFlow,
      format: 'currency',
      better: true,
    },
    {
      label: 'Savings rate',
      left: leftStats.savingsRate,
      right: rightStats.savingsRate,
      format: 'percent',
      better: true,
    },
    {
      label: 'Expense ratio',
      left: leftStats.expenseRatio,
      right: rightStats.expenseRatio,
      format: 'percent',
      better: false,
    },
    {
      label: 'Transactions',
      left: leftStats.transactionCount,
      right: rightStats.transactionCount,
      format: 'number',
      better: false,
    },
    {
      label: 'Average expense',
      left: leftStats.avgExpense,
      right: rightStats.avgExpense,
      format: 'currency',
      better: false,
    },
    {
      label: 'Highest expense',
      left: leftStats.highestExpense,
      right: rightStats.highestExpense,
      format: 'currency',
      better: false,
    },
    {
      label: 'Top category',
      left: leftStats.highestCategory,
      right: rightStats.highestCategory,
      format: 'text',
    },
    {
      label: 'Payment method',
      left: leftStats.topPaymentMethod,
      right: rightStats.topPaymentMethod,
      format: 'text',
    },
  ];
    const leftScore =
    (leftStats.savings > rightStats.savings ? 1 : 0) +
    (leftStats.expenses < rightStats.expenses ? 1 : 0) +
    (leftStats.savingsRate > rightStats.savingsRate ? 1 : 0);

  const rightScore =
    (rightStats.savings > leftStats.savings ? 1 : 0) +
    (rightStats.expenses < leftStats.expenses ? 1 : 0) +
    (rightStats.savingsRate > leftStats.savingsRate ? 1 : 0);

  const winner =
    leftScore === rightScore
      ? 'Equal performance'
      : leftScore > rightScore
      ? `${leftMonthLabel} performed better`
      : `${rightMonthLabel} performed better`;

  const summary = [
    {
      label: 'Savings difference',
      value: formatCurrency(
        Math.abs(leftStats.savings - rightStats.savings)
      ),
      icon: LuWallet,
    },
    {
      label: 'Expense difference',
      value: formatCurrency(
        Math.abs(leftStats.expenses - rightStats.expenses)
      ),
      icon: LuTrendingDown,
    },
    {
      label: 'Best savings rate',
      value: `${Math.max(
        leftStats.savingsRate,
        rightStats.savingsRate
      )}%`,
      icon: LuPercent,
    },
    {
      label: 'Cash flow improvement',
      value: formatCurrency(
        Math.abs(
          leftStats.netCashFlow - rightStats.netCashFlow
        )
      ),
      icon: LuArrowLeftRight,
    },
  ];

  return (
    <div className="compare-table-card">
      <div className="compare-header">
        <div className="compare-month-card">
          <span className="compare-month-label">
            Month A
          </span>

          <select
            value={leftMonth}
            onChange={(e) =>
              onLeftChange(e.target.value)
            }
          >
            {months.map((month) => (
              <option
                key={month.value}
                value={month.value}
                disabled={
                  month.value === rightMonth
                }
              >
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="compare-vs">
          <div className="compare-vs-badge">
            VS
          </div>
          <span>
            Head-to-head comparison
          </span>
        </div>

        <div className="compare-month-card right">
          <span className="compare-month-label">
            Month B
          </span>

          <select
            value={rightMonth}
            onChange={(e) =>
              onRightChange(e.target.value)
            }
          >
            {months.map((month) => (
              <option
                key={month.value}
                value={month.value}
                disabled={
                  month.value === leftMonth
                }
              >
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-table">
        {rows.map((row) => {
          const leftClass =
            row.format === 'text'
              ? 'neutral'
              : getColor(
                  row.left,
                  row.right,
                  row.better
                );

          const rightClass =
            row.format === 'text'
              ? 'neutral'
              : getColor(
                  row.right,
                  row.left,
                  row.better
                );

          const formatValue = (value) => {
            if (row.format === 'currency')
              return formatCurrency(value);
            if (row.format === 'percent')
              return `${value}%`;
            return value;
          };

          return (
            <div
              key={row.label}
              className="compare-row"
            >
              <div
                className={`compare-value ${leftClass}`}
              >
                <span className="compare-mobile-month">
                  {leftMonthLabel}
                </span>
                <strong>
                  {formatValue(row.left)}
                </strong>
              </div>

              <div className="compare-label">
                {row.label}
              </div>

              <div
                className={`compare-value ${rightClass}`}
              >
                <span className="compare-mobile-month">
                  {rightMonthLabel}
                </span>
                <strong>
                  {formatValue(row.right)}
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      <div className="compare-summary">
        <div className="compare-summary-header">
          <h3>Comparison summary</h3>

          <span className="compare-winner-badge">
            {winner}
          </span>
        </div>

        <div className="compare-summary-grid">
          {summary.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="compare-summary-item"
              >
                <div className="compare-summary-left">
                  <div className="compare-summary-icon">
                    <Icon />
                  </div>

                  <span>{item.label}</span>
                </div>

                <strong>{item.value}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompareTable;