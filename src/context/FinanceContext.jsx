import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { financeTransactions } from '../data/financeData';
import { initialBudgets } from '../data/budgetData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance-transactions');
    return saved ? JSON.parse(saved) : financeTransactions;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('fintrack-budgets');
    return saved ? JSON.parse(saved) : initialBudgets;
  });

  useEffect(() => {
    localStorage.setItem(
      'finance-transactions',
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(
      'fintrack-budgets',
      JSON.stringify(budgets)
    );
  }, [budgets]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const updateTransaction = (
    id,
    updatedTransaction
  ) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updatedTransaction,
            }
          : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  const updateBudget = (category, amount) => {
    setBudgets((prev) => ({
      ...prev,
      [category]: Number(amount),
    }));
  };

  const resetBudgets = () => {
    setBudgets(initialBudgets);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        budgets,
        updateBudget,
        resetBudgets,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () =>
  useContext(FinanceContext);