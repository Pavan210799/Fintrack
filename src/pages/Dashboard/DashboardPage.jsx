import { useEffect, useState } from 'react';

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SummaryCards from '../../components/dashboard/SummaryCards';
import IncomeExpenseChart from '../../components/dashboard/IncomeExpenseChart';
import CategoryBreakdown from '../../components/dashboard/CategoryBreakdown';
import FinancialInsights from '../../components/dashboard/FinancialInsights';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import FinancialHealthScore from '../../components/dashboard/FinancialHealthScore';

import './DashboardPage.css';

const DashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2026-08');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme
    );
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <div className='dashboard-page'>
      <DashboardHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <SummaryCards selectedMonth={selectedMonth} />

      <div className='dashboard-chart-grid'>
        <IncomeExpenseChart selectedMonth={selectedMonth} />
        <CategoryBreakdown selectedMonth={selectedMonth} />
      </div>

      <div className='dashboard-bottom-grid'>
        <FinancialInsights selectedMonth={selectedMonth} />
        <RecentTransactions selectedMonth={selectedMonth} />
      </div>

      <FinancialHealthScore selectedMonth={selectedMonth} />
    </div>
  );
};

export default DashboardPage;