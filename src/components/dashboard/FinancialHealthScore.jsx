import { useFinance } from '../../context/FinanceContext';
import './FinancialHealthScore.css';

const FinancialHealthScore = ({ selectedMonth }) => {
  const { transactions } = useFinance();

  const monthTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  const income = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = monthTransactions.filter(
    (t) => t.type === 'expense'
  );

  const totalExpenses = expenses.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const savings = income - totalExpenses;

  const savingsRate =
    income > 0 ? (savings / income) * 100 : 0;

  const billsRatio =
    totalExpenses > 0
      ? ((categoryTotals.Bills || 0) / totalExpenses) *
        100
      : 0;

  const foodRatio =
    totalExpenses > 0
      ? ((categoryTotals.Food || 0) / totalExpenses) *
        100
      : 0;

  const transportRatio =
    totalExpenses > 0
      ? ((categoryTotals.Transport || 0) /
          totalExpenses) *
        100
      : 0;

  let score = 0;

  score += Math.min(savingsRate * 0.5, 40);
  score += Math.max(0, 20 - billsRatio * 0.2);
  score += Math.max(0, 15 - foodRatio * 0.3);
  score += Math.max(0, 10 - transportRatio * 0.2);
  score +=
    Object.keys(categoryTotals).length >= 5 ? 15 : 8;

  score = Math.round(Math.min(score, 100));

  const status =
    score >= 85
      ? 'Excellent'
      : score >= 70
        ? 'Good'
        : score >= 50
          ? 'Fair'
          : 'Needs attention';

  const monthLabel = new Date(
    `${selectedMonth}-01`
  ).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='health-card'>
      <div className='health-header'>
        <h3>Financial health score</h3>
        <span className='health-badge'>
          {monthLabel}
        </span>
      </div>

      <div className='health-content'>
        <div className='health-score-section'>
          <div
            className='health-score-circle'
            style={{
              background: `conic-gradient(var(--primary) ${
                score * 3.6
              }deg, rgba(124,92,250,0.12) 0deg)`,
            }}
          >
            <div className='health-score-inner'>
              <h2>{score}</h2>
              <span>{status}</span>
            </div>
          </div>
        </div>

        <div className='health-metrics'>
          <div className='metric'>
            <div className='metric-row'>
              <span>Savings rate</span>
              <strong>
                {savingsRate.toFixed(1)}%
              </strong>
            </div>

            <div className='metric-bar'>
              <div
                className='metric-fill green'
                style={{
                  width: `${Math.min(
                    savingsRate,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className='metric'>
            <div className='metric-row'>
              <span>Bills ratio</span>
              <strong>
                {billsRatio.toFixed(1)}%
              </strong>
            </div>

            <div className='metric-bar'>
              <div
                className='metric-fill orange'
                style={{
                  width: `${Math.min(
                    billsRatio,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className='metric'>
            <div className='metric-row'>
              <span>Food ratio</span>
              <strong>
                {foodRatio.toFixed(1)}%
              </strong>
            </div>

            <div className='metric-bar'>
              <div
                className='metric-fill pink'
                style={{
                  width: `${Math.min(
                    foodRatio,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className='health-summary'>
            <p>
              You saved{' '}
              <strong>
                ₹{savings.toLocaleString('en-IN')}
              </strong>{' '}
              this month with{' '}
              <strong>{expenses.length}</strong>{' '}
              expense transactions recorded so far.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;