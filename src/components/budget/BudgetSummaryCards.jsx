import {
  LuWallet,
  LuReceipt,
  LuPiggyBank,
  LuTriangleAlert,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import { initialBudgets } from '../../data/budgetData';
import './BudgetSummaryCards.css';

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const BudgetSummaryCards = ({ selectedMonth }) => {
  const { transactions } = useFinance();

  const monthExpenses = transactions.filter(
    (t) =>
      t.type === 'expense' &&
      t.date.startsWith(selectedMonth)
  );

  const totalBudget = Object.values(initialBudgets).reduce(
    (sum, value) => sum + value,
    0
  );

  const totalSpent = monthExpenses.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const remainingBudget = totalBudget - totalSpent;

  const overBudgetCount = Object.entries(initialBudgets).filter(
    ([category, budget]) => {
      const spent = monthExpenses
        .filter((t) => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0);

      return spent > budget;
    }
  ).length;

  const usagePercentage =
    totalBudget > 0
      ? Math.round((totalSpent / totalBudget) * 100)
      : 0;

  const cards = [
    {
      title: 'Total budget',
      value: formatCurrency(totalBudget),
      subtitle: 'Monthly allocation',
      icon: LuWallet,
      type: 'budget',
    },
    {
      title: 'Spent',
      value: formatCurrency(totalSpent),
      subtitle: `${usagePercentage}% of budget used`,
      icon: LuReceipt,
      type: 'spent',
    },
    {
      title: 'Remaining',
      value: formatCurrency(Math.max(remainingBudget, 0)),
      subtitle:
        remainingBudget >= 0
          ? 'Available to spend'
          : 'Budget exceeded',
      icon: LuPiggyBank,
      type: 'remaining',
    },
    {
      title: 'Over budget',
      value: `${overBudgetCount} ${
        overBudgetCount === 1 ? 'category' : 'categories'
      }`,
      subtitle:
        overBudgetCount === 0
          ? 'Everything on track'
          : 'Needs attention',
      icon: LuTriangleAlert,
      type: 'warning',
    },
  ];

  return (
    <div className="budget-summary-grid">
      {cards.map(
        ({ title, value, subtitle, icon: Icon, type }) => (
          <div key={title} className="budget-summary-card">
            <div className="budget-summary-top">
              <div>
                <p className="budget-summary-title">
                  {title}
                </p>
                <h3>{value}</h3>
              </div>

              <div
                className={`budget-summary-icon ${type}`}
              >
                <Icon />
              </div>
            </div>

            <p className="budget-summary-subtitle">
              {subtitle}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default BudgetSummaryCards;