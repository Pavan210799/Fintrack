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
import './IncomeExpenseChart.css';

const IncomeExpenseChart = ({ selectedMonth }) => {
  const { transactions } = useFinance();

  const monthTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  const incomeTotal = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseMap = {};

  monthTransactions
    .filter((t) => t.type === 'expense')
    .forEach((transaction) => {
      const day = Number(transaction.date.split('-')[2]);
      expenseMap[day] =
        (expenseMap[day] || 0) + transaction.amount;
    });

  const [year, month] = selectedMonth
    .split('-')
    .map(Number);

  const daysInMonth = new Date(year, month, 0).getDate();

  const latestTransactionDay =
    monthTransactions.length > 0
      ? Math.max(
          ...monthTransactions.map((t) =>
            Number(t.date.split('-')[2])
          )
        )
      : daysInMonth;

  const chartData = [];
  let cumulativeExpense = 0;

  for (let day = 1; day <= latestTransactionDay; day++) {
    cumulativeExpense += expenseMap[day] || 0;

    chartData.push({
      day,
      income: incomeTotal,
      expense: cumulativeExpense,
    });
  }

  return (
    <div className='chart-card'>
      <div className='chart-header'>
        <h3>Income vs expenses</h3>

        <div className='chart-legend'>
          <span className='legend income'>Income</span>
          <span className='legend expense'>Expenses</span>
        </div>
      </div>

      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={chartData}>
          <CartesianGrid
            stroke='var(--chart-grid)'
            strokeDasharray='4 4'
          />

          <XAxis
            dataKey='day'
            tick={{
              fill: 'var(--text-secondary)',
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: 'var(--text-secondary)',
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
            width={70}
          />

          <Tooltip
            formatter={(value) =>
              `₹${value.toLocaleString('en-IN')}`
            }
            labelFormatter={(label) => `Day ${label}`}
          />

          <Line
            type='monotone'
            dataKey='income'
            stroke='var(--chart-income)'
            strokeWidth={3}
            dot={false}
          />

          <Line
            type='monotone'
            dataKey='expense'
            stroke='var(--chart-expense)'
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;