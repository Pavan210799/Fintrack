import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import AnalyticsHeader from '../../components/analytics/AnalyticsHeader';
import AnalyticsSummaryCards from '../../components/analytics/AnalyticsSummaryCards';
import SpendingTrendChart from '../../components/analytics/SpendingTrendChart';
import CategoryBreakdownAnalytics from '../../components/analytics/CategoryBreakdownAnalytics';
import MonthlyComparisonChart from '../../components/analytics/MonthlyComparisonChart';
import AnalyticsInsights from '../../components/analytics/AnalyticsInsights';

import { useTheme } from '../../context/ThemeContext';

import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const { openSidebar } = useOutletContext();

  const [selectedMonth, setSelectedMonth] = useState('2026-08');

  const { theme, toggleTheme } = useTheme();

  return (
    <div className='analytics-page'>
      <AnalyticsHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        theme={theme}
        toggleTheme={toggleTheme}
        openSidebar={openSidebar}
      />

      <AnalyticsSummaryCards selectedMonth={selectedMonth} />

      <div className='analytics-chart-grid'>
        <SpendingTrendChart selectedMonth={selectedMonth} />
        <CategoryBreakdownAnalytics selectedMonth={selectedMonth} />
      </div>

      <MonthlyComparisonChart selectedMonth={selectedMonth} />

      <AnalyticsInsights selectedMonth={selectedMonth} />
    </div>
  );
};

export default AnalyticsPage;