import { useState, useEffect, useMemo, useRef } from 'react';
import {
  LuPencil,
  LuTrash2,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';
import { useFinance } from '../../context/FinanceContext';
import './ExpensesTable.css';

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`;

const ITEMS_PER_PAGE = 15;

const ExpensesTable = ({
  transactions,
  onEditTransaction,
}) => {
  const { deleteTransaction } = useFinance();

  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef(null);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [transactions]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedTransactions.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [sortedTransactions]);

  const scrollToTable = () => {
    if (tableRef.current) {
      const y =
        tableRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        140;

      window.scrollTo({
        top: Math.max(y, 0),
        behavior: 'smooth',
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      scrollToTable();
    }, 50);
  };

  const paginatedTransactions =
    sortedTransactions.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  return (
    <div
      className='expenses-table-card'
      ref={tableRef}
    >
      <div className='expenses-table-header'>
        <h3>Transactions</h3>
        <span>
          {sortedTransactions.length} transaction
          {sortedTransactions.length !== 1
            ? 's'
            : ''}
        </span>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className='empty-state'>
          No transactions found.
        </div>
      ) : (
        <>
          <div className='transaction-list'>
            {paginatedTransactions.map(
              (transaction) => (
                <div
                  key={transaction.id}
                  className='transaction-card-row'
                >
                  <div className='transaction-main'>
                    <div
                      className={`transaction-dot ${transaction.type}`}
                    />

                    <div className='transaction-info'>
                      <h4>
                        {transaction.title}
                      </h4>
                      <p>
                        {new Date(
                          transaction.date
                        ).toLocaleDateString(
                          'en-IN',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className='transaction-category'>
                    <span className='category-badge'>
                      {transaction.category}
                    </span>
                  </div>

                  <div className='transaction-type'>
                    <span
                      className={`type-badge ${transaction.type}`}
                    >
                      {transaction.type}
                    </span>
                  </div>

                  <div className='transaction-payment'>
                    <span className='payment-badge'>
                      {transaction.paymentMethod ===
                      'Bank Transfer'
                        ? 'Net Banking'
                        : transaction.paymentMethod}
                    </span>
                  </div>

                  <div
                    className={`transaction-amount ${transaction.type}`}
                  >
                    {transaction.type ===
                    'income'
                      ? '+'
                      : '-'}
                    {formatCurrency(
                      transaction.amount
                    )}
                  </div>

                  <div className='transaction-actions'>
                    <button
                      className='table-icon-btn'
                      title='Edit'
                      onClick={() =>
                        onEditTransaction(
                          transaction
                        )
                      }
                    >
                      <LuPencil />
                    </button>

                    <button
                      className='table-icon-btn delete'
                      title='Delete'
                      onClick={() => {
                        if (
                          window.confirm(
                            'Delete this transaction?'
                          )
                        ) {
                          deleteTransaction(
                            transaction.id
                          );
                        }
                      }}
                    >
                      <LuTrash2 />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <div className='pagination'>
            <button
              className='page-btn'
              disabled={currentPage === 1}
              onClick={() =>
                handlePageChange(
                  currentPage - 1
                )
              }
            >
              <LuChevronLeft />
              Previous
            </button>

            <div className='page-numbers'>
              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    className={
                      currentPage ===
                      index + 1
                        ? 'page-btn active'
                        : 'page-btn'
                    }
                    onClick={() =>
                      handlePageChange(
                        index + 1
                      )
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>

            <button
              className='page-btn'
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                handlePageChange(
                  currentPage + 1
                )
              }
            >
              Next
              <LuChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpensesTable;