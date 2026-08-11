import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SummaryCards from '../../components/dashboard/SummaryCards';
import IncomeExpenseChart from '../../components/dashboard/IncomeExpenseChart';
import CategoryBreakdown from '../../components/dashboard/CategoryBreakdown';
import FinancialInsights from '../../components/dashboard/FinancialInsights';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import FinancialHealthScore from '../../components/dashboard/FinancialHealthScore';

import { useTheme } from '../../context/ThemeContext';

import './DashboardPage.css';

const DashboardPage = () => {
  const { openSidebar } = useOutletContext();

  const [selectedMonth, setSelectedMonth] =
    useState('2026-08');

  const { theme, toggleTheme } = useTheme();

  return (
    <div className='dashboard-page'>
      <DashboardHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        theme={theme}
        toggleTheme={toggleTheme}
        openSidebar={openSidebar}
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