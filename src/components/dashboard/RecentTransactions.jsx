import { useFinance } from '../../context/FinanceContext';
import { useNavigate } from 'react-router-dom';
import './RecentTransactions.css';

const RecentTransactions = ({ selectedMonth = '2026-08' }) => {
  const { transactions } = useFinance();
  const navigate = useNavigate();

  const recentTransactions = transactions
    .filter((t) => t.date.startsWith(selectedMonth))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className='transactions-card'>
      <div className='transactions-header'>
        <h3>Recent transactions</h3>
        <button
          className='transactions-button'
          onClick={() => navigate('/expenses')}
        >
          View all
        </button>
      </div>

      <div className='transactions-list'>
        {recentTransactions.map((transaction) => (
          <div
            className='transaction-item'
            key={transaction.id}
          >
            <div className='transaction-left'>
              <div
                className={`transaction-icon ${transaction.type}`}
              >
                {transaction.type === 'income'
                  ? '↙'
                  : '↗'}
              </div>

              <div className='transaction-info'>
                <h4>{transaction.title}</h4>
                <p>
                  {transaction.category} •{' '}
                  {new Date(transaction.date).toLocaleDateString(
                    'en-IN',
                    {
                      day: 'numeric',
                      month: 'short',
                    }
                  )}
                </p>
              </div>
            </div>

            <div
              className={`transaction-amount ${transaction.type}`}
            >
              {transaction.type === 'income' ? '+' : '-'}₹
              {transaction.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;