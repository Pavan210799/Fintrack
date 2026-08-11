import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardLayout from './layouts/DashboardLayout';

import DashboardPage from './pages/Dashboard/DashboardPage';
import ExpensesPage from './pages/Expenses/ExpensesPage';
import BudgetPage from './pages/Budget/BudgetPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import ComparePage from './pages/Compare/ComparePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/expenses' element={<ExpensesPage />} />
          <Route path='/budget' element={<BudgetPage />} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          <Route path='/compare' element={<ComparePage />} />
        </Route>
      </Routes>

      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme='colored'
      />
    </BrowserRouter>
  );
};

export default App;