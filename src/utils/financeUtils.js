import { financeTransactions } from '../data/financeData';

export const getTransactionsByMonth = (month) => {
  return financeTransactions.filter((t) => {
    return new Date(t.date).toLocaleString('default', {
      month: 'long',
    }).toLowerCase() === month;
  });
};

export const getMonthlySummary = (month) => {
  const transactions = getTransactionsByMonth(month);

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expenses,
    savings: income - expenses,
  };
};