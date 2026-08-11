import {
LuCircleCheck,
LuTriangleAlert,
LuChartPie,
LuTarget,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import { initialBudgets } from '../../data/budgetData';
import './BudgetInsights.css';

const formatCurrency = (amount) =>
`₹${amount.toLocaleString('en-IN')}`;

const BudgetInsights = ({ selectedMonth }) => {
const { transactions } = useFinance();

const monthExpenses = transactions.filter(
(t) =>
t.type === 'expense' &&
t.date.startsWith(selectedMonth)
);

const categories = Object.entries(initialBudgets).map(
([category, budget]) => {
const spent = monthExpenses
.filter((t) => t.category === category)
.reduce((sum, t) => sum + t.amount, 0);

  const utilization =
    budget > 0 ? (spent / budget) * 100 : 0;

  return {
    category,
    budget,
    spent,
    utilization,
  };
}

);

const bestManaged = [...categories].sort(
(a, b) => a.utilization - b.utilization
)[0];

const needsAttention = [...categories].sort(
(a, b) => b.utilization - a.utilization
)[0];

const totalBudget = Object.values(initialBudgets).reduce(
(sum, value) => sum + value,
0
);

const totalSpent = monthExpenses.reduce(
(sum, t) => sum + t.amount,
0
);

const utilizationPercentage =
totalBudget > 0
? Math.round((totalSpent / totalBudget) * 100)
: 0;

const categoriesOnTrack = categories.filter(
(c) => c.spent <= c.budget
).length;

return ( <div className='budget-insights'> <div className='budget-section-header'> <h3>Budget insights</h3> </div>

  <div className='budget-insights-grid'>
    <div className='budget-insight-card'>
      <div className='budget-insight-left'>
        <div className='budget-insight-icon green'>
          <LuCircleCheck />
        </div>
      </div>

      <div className='budget-insight-right'>
        <h4>Best managed</h4>
        <strong>{bestManaged.category}</strong>
        <p>
          {Math.round(bestManaged.utilization)}% of
          budget used
        </p>
      </div>
    </div>

    <div className='budget-insight-card'>
      <div className='budget-insight-left'>
        <div className='budget-insight-icon orange'>
          <LuTriangleAlert />
        </div>
      </div>

      <div className='budget-insight-right'>
        <h4>Needs attention</h4>
        <strong>{needsAttention.category}</strong>
        <p>
          {formatCurrency(needsAttention.spent)} spent
        </p>
      </div>
    </div>

    <div className='budget-insight-card'>
      <div className='budget-insight-left'>
        <div className='budget-insight-icon purple'>
          <LuChartPie />
        </div>
      </div>

      <div className='budget-insight-right'>
        <h4>Budget utilization</h4>
        <strong>{utilizationPercentage}%</strong>
        <p>
          {formatCurrency(totalSpent)} of{' '}
          {formatCurrency(totalBudget)}
        </p>
      </div>
    </div>

    <div className='budget-insight-card'>
      <div className='budget-insight-left'>
        <div className='budget-insight-icon blue'>
          <LuTarget />
        </div>
      </div>

      <div className='budget-insight-right'>
        <h4>Categories on track</h4>
        <strong>
          {categoriesOnTrack}/{categories.length}
        </strong>
        <p>Within their monthly budget</p>
      </div>
    </div>
  </div>
</div>

);
};

export default BudgetInsights;
