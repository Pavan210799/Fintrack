import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';

import DashboardPage from './pages/Dashboard/DashboardPage';
import ExpensesPage from './pages/Expenses/ExpensesPage';
import BudgetsPage from './pages/Budgets/BudgetsPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import ReportsPage from './pages/Reports/ReportsPage';
import SettingsPage from './pages/Settings/SettingsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/expenses' element={<ExpensesPage />} />
          <Route path='/budgets' element={<BudgetsPage />} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          <Route path='/reports' element={<ReportsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;