import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import AnalyticsHeader from '../../components/analytics/AnalyticsHeader';
import AnalyticsSummaryCards from '../../components/analytics/AnalyticsSummaryCards';
import SpendingTrendChart from '../../components/analytics/SpendingTrendChart';
import CategoryBreakdownAnalytics from '../../components/analytics/CategoryBreakdownAnalytics';
import MonthlyComparisonChart from '../../components/analytics/MonthlyComparisonChart';
import AnalyticsInsights from '../../components/analytics/AnalyticsInsights';
import PageSkeleton from '../../components/common/PageSkeleton';

import { useTheme } from '../../context/ThemeContext';
import PageTransition from '../../components/common/PageTransition';

import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const { openSidebar } = useOutletContext();

  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [loading, setLoading] = useState(true);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='analytics-page'>
      <AnalyticsHeader
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
          <div className='analytics-page'>
            <AnalyticsSummaryCards selectedMonth={selectedMonth} />

            <div className='analytics-chart-grid'>
              <SpendingTrendChart selectedMonth={selectedMonth} />
              <CategoryBreakdownAnalytics selectedMonth={selectedMonth} />
            </div>

            <MonthlyComparisonChart selectedMonth={selectedMonth} />

            <AnalyticsInsights selectedMonth={selectedMonth} />
          </div>
        </PageTransition>
      )}
    </div>
  );
};

export default AnalyticsPage;