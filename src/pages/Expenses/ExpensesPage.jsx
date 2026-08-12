import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useFinance } from '../../context/FinanceContext';
import { useTheme } from '../../context/ThemeContext';

import ExpensesHeader from '../../components/expenses/ExpensesHeader';
import ExpensesFilters from '../../components/expenses/ExpensesFilters';
import ExpensesTable from '../../components/expenses/ExpensesTable';
import ExpenseFormModal from '../../components/expenses/ExpenseFormModal';

import PageTransition from '../../components/common/PageTransition';
import PageSkeleton from '../../components/common/PageSkeleton';

import './ExpensesPage.css';

const ExpensesPage = () => {
  const { transactions } = useFinance();
  const { openSidebar } = useOutletContext();

  const { theme, toggleTheme } = useTheme();

  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const monthMatch = transaction.date.startsWith(selectedMonth);

        const categoryMatch =
          categoryFilter === 'All' ||
          transaction.category === categoryFilter;

        const paymentMatch =
          paymentMethod === 'All' ||
          transaction.paymentMethod === paymentMethod ||
          (paymentMethod === 'Net Banking' &&
            transaction.paymentMethod === 'Bank Transfer');

        const searchMatch = transaction.title
          .toLowerCase()
          .includes(search.toLowerCase());

        return (
          monthMatch &&
          categoryMatch &&
          paymentMatch &&
          searchMatch
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [
    transactions,
    selectedMonth,
    categoryFilter,
    paymentMethod,
    search,
  ]);

  return (
    <div className='expenses-page'>
      <ExpensesHeader
        theme={theme}
        toggleTheme={toggleTheme}
        openSidebar={openSidebar}
        onAddTransaction={() => {
          setEditingTransaction(null);
          setIsModalOpen(true);
        }}
      />
    
      {loading ? (
        <PageSkeleton />
      ) : (
        <PageTransition>
          <ExpensesFilters
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            search={search}
            setSearch={setSearch}
          />

          <ExpensesTable
            transactions={filteredTransactions}
            onEditTransaction={(transaction) => {
              setEditingTransaction(transaction);
              setIsModalOpen(true);
            }}
          />
        </PageTransition>
      )}

      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

export default ExpensesPage;