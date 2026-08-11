import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { useFinance } from '../../context/FinanceContext';
import './CategoryBreakdown.css';

const COLORS = {
  Food: '#F97316',
  Transport: '#06B6D4',
  Shopping: '#7C5CFA',
  Bills: '#F59E0B',
  Entertainment: '#EC4899',
  Health: '#10B981',
};

const CategoryBreakdown = ({ selectedMonth = '2026-08' }) => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const monthExpenses = transactions.filter(
      (t) =>
        t.type === 'expense' &&
        t.date.startsWith(selectedMonth)
    );

    const grouped = {};

    monthExpenses.forEach((t) => {
      grouped[t.category] =
        (grouped[t.category] || 0) + t.amount;
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      color: COLORS[name] || '#94A3B8',
    }));
  }, [transactions, selectedMonth]);

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const [active, setActive] = useState({
    name: 'Total',
    value: total,
  });

  return (
    <div className='category-card'>
      <h3>Expense by category</h3>

      <div className='category-chart'>
        <ResponsiveContainer width='100%' height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              innerRadius={78}
              outerRadius={118}
              paddingAngle={3}
              stroke='none'
              onMouseEnter={(_, index) =>
                setActive(data[index])
              }
              onMouseLeave={() =>
                setActive({
                  name: 'Total',
                  value: total,
                })
              }
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className='category-center'>
          <h4>{active.name}</h4>
          <span>
            ₹{active.value.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;