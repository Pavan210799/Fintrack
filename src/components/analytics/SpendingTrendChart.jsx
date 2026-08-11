import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { useFinance } from '../../context/FinanceContext';
import './SpendingTrendChart.css';

const formatCurrency = (value) =>
  `₹${value.toLocaleString('en-IN')}`;

const monthLabels = {
  '2026-03': 'Mar',
  '2026-04': 'Apr',
  '2026-05': 'May',
  '2026-06': 'Jun',
  '2026-07': 'Jul',
  '2026-08': 'Aug',
};

const SpendingTrendChart = ({ selectedMonth }) => {
  const { transactions } = useFinance();

  const months = [
    '2026-03',
    '2026-04',
    '2026-05',
    '2026-06',
    '2026-07',
    '2026-08',
  ];

  const chartData = months.map((month) => {
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
      month: monthLabels[month],
      income,
      expenses,
      isSelected: month === selectedMonth,
    };
  });

  return (
    <div className='trend-chart-card'>
      <div className='trend-chart-header'>
        <div>
          <h3>Income vs expense trend</h3>
          <p>
            Compare monthly income and expenses from March to August 2026.
          </p>
        </div>

        <div className='trend-chart-legend'>
          <div className='legend-item'>
            <span className='legend-dot income'></span>
            <span>Income</span>
          </div>

          <div className='legend-item'>
            <span className='legend-dot expense'></span>
            <span>Expenses</span>
          </div>
        </div>
      </div>

      <div className='trend-chart-wrapper'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 12,
              left: -8,
              bottom: 22,
            }}
          >
            <CartesianGrid
              stroke='var(--card-border)'
              strokeDasharray='4 4'
            />

            <XAxis
              dataKey='month'
              stroke='var(--text-secondary)'
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              interval={0}
              height={28}
            />

            <YAxis
              stroke='var(--text-secondary)'
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              width={42}
              tickFormatter={(value) =>
                `₹${Math.round(value / 1000)}k`
              }
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(value)
              }
              labelStyle={{
                color: 'var(--text-primary)',
              }}
              contentStyle={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                color: 'var(--text-primary)',
              }}
            />

            <Line
              type='monotone'
              dataKey='income'
              stroke='var(--income)'
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />

            <Line
              type='monotone'
              dataKey='expenses'
              stroke='var(--expense)'
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrendChart;