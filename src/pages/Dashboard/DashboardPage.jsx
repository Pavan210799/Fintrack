import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SummaryCards from '../../components/dashboard/SummaryCards';
import IncomeExpenseChart from '../../components/dashboard/IncomeExpenseChart';
import CategoryBreakdown from '../../components/dashboard/CategoryBreakdown';
import FinancialInsights from '../../components/dashboard/FinancialInsights';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import FinancialHealthScore from '../../components/dashboard/FinancialHealthScore';

import PageSkeleton from '../../components/common/PageSkeleton';

import { useTheme } from '../../context/ThemeContext';
import PageTransition from '../../components/common/PageTransition';

import './DashboardPage.css';

const DashboardPage = () => {
  const { openSidebar } = useOutletContext();

  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [loading, setLoading] = useState(true);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='dashboard-page'>
      <DashboardHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        theme={theme}
        toggleTheme={toggleTheme}
        openSidebar={openSidebar}
      />
      {loading ? (
        <PageSkeleton />
      ) : (

        <PageTransition>
          <div className='dashboard-page'>
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
        </PageTransition>
      )}
    </div>
  );
};

export default DashboardPage;