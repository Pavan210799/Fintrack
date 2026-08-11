import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useTheme } from '../../context/ThemeContext';

import BudgetHeader from '../../components/budget/BudgetHeader';
import BudgetSummaryCards from '../../components/budget/BudgetSummaryCards';
import BudgetCategoryCards from '../../components/budget/BudgetCategoryCards';
import BudgetInsights from '../../components/budget/BudgetInsights';

import './BudgetPage.css';

const BudgetPage = () => {
  const { openSidebar } = useOutletContext();
  const { theme, toggleTheme } = useTheme();

  const [selectedMonth, setSelectedMonth] =
    useState('2026-08');

  return (
    <div className="budget-page">
      <BudgetHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        theme={theme}
        toggleTheme={toggleTheme}
        openSidebar={openSidebar}
      />

      <BudgetSummaryCards selectedMonth={selectedMonth} />
      <BudgetCategoryCards selectedMonth={selectedMonth} />
      <BudgetInsights selectedMonth={selectedMonth} />
    </div>
  );
};

export default BudgetPage;