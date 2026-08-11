import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import './MonthlyComparisonChart.css';

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const months = [
  { value: '2026-03', label: 'Mar' },
  { value: '2026-04', label: 'Apr' },
  { value: '2026-05', label: 'May' },
  { value: '2026-06', label: 'Jun' },
  { value: '2026-07', label: 'Jul' },
  { value: '2026-08', label: 'Aug' },
];

const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
];

const MonthlyComparisonChart = () => {
  const { transactions } = useFinance();

  const chartData = months.map((month) => {
    const monthTransactions = transactions.filter(
      (t) =>
        t.type === 'expense' &&
        t.date.startsWith(month.value)
    );

    const categoryTotals = categories.reduce(
      (acc, category) => {
        acc[category] = monthTransactions
          .filter((t) => t.category === category)
          .reduce((sum, t) => sum + t.amount, 0);

        return acc;
      },
      {}
    );

    return {
      month: month.label,
      ...categoryTotals,
    };
  });

  return (
    <div className="monthly-comparison-card">
      <div className="monthly-comparison-header">
        <div>
          <h3>Monthly category comparison</h3>
          <p>
            Compare spending across categories from March to August 2026.
          </p>
        </div>
      </div>

      <div className="monthly-comparison-chart">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            barGap={8}
            barCategoryGap={20}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="var(--card-border)"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                `₹${Math.round(value / 1000)}k`
              }
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(value)
              }
              contentStyle={{
                background: 'var(--card)',
                border:
                  '1px solid var(--card-border)',
                borderRadius: '16px',
                color: 'var(--text-primary)',
              }}
            />

            <Bar dataKey="Food" fill="#7C5CFA" radius={[6,6,0,0]} barSize={18} />
            <Bar dataKey="Transport" fill="#10B981" radius={[6,6,0,0]} barSize={18} />
            <Bar dataKey="Shopping" fill="#F59E0B" radius={[6,6,0,0]} barSize={18} />
            <Bar dataKey="Bills" fill="#EF4444" radius={[6,6,0,0]} barSize={18} />
            <Bar dataKey="Entertainment" fill="#3B82F6" radius={[6,6,0,0]} barSize={18} />
            <Bar dataKey="Health" fill="#EC4899" radius={[6,6,0,0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyComparisonChart;