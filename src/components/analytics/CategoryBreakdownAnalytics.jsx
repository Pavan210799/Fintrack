import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { useFinance } from '../../context/FinanceContext';
import './CategoryBreakdownAnalytics.css';

const COLORS = [
  '#7C5CFA',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#3B82F6',
  '#EC4899',
];

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const CategoryBreakdownAnalytics = () => {
  const { transactions } = useFinance();
  const [activeIndex, setActiveIndex] = useState(null);

  // Overall category totals from March-August 2026
  const categoryData = useMemo(() => {
    return transactions
      .filter(
        (t) =>
          t.type === 'expense' &&
          t.date >= '2026-03-01' &&
          t.date <= '2026-08-31'
      )
      .reduce((acc, transaction) => {
        const existing = acc.find(
          (item) => item.name === transaction.category
        );

        if (existing) {
          existing.value += transaction.amount;
        } else {
          acc.push({
            name: transaction.category,
            value: transaction.amount,
          });
        }

        return acc;
      }, [])
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const totalExpenses = categoryData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const centerTitle =
    activeIndex !== null
      ? categoryData[activeIndex].name
      : 'Total expenses';

  const centerValue =
    activeIndex !== null
      ? categoryData[activeIndex].value
      : totalExpenses;

  return (
    <div className='category-breakdown-card'>
      <div className='category-breakdown-header'>
        <div>
          <h3>Category breakdown</h3>
          <p>
            Expense distribution across March-August 2026.
          </p>
        </div>
      </div>

      <div className='category-chart-wrapper'>
        <div className='category-chart-container'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey='value'
                nameKey='name'
                innerRadius={74}
                outerRadius={102}
                paddingAngle={3}
                stroke='none'
                onMouseEnter={(_, index) =>
                  setActiveIndex(index)
                }
                onMouseLeave={() =>
                  setActiveIndex(null)
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className='category-chart-center'>
            <span>{centerTitle}</span>
            <strong>
              {formatCurrency(centerValue)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdownAnalytics;