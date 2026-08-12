import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardLayout from './layouts/DashboardLayout';

import DashboardPage from './pages/Dashboard/DashboardPage';
import ExpensesPage from './pages/Expenses/ExpensesPage';
import BudgetPage from './pages/Budget/BudgetPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import ComparePage from './pages/Compare/ComparePage';
import ProfilePage from './pages/Profile/ProfilePage';
import AuthPage from './pages/Auth/AuthPage';

import ProtectedRoute from './components/auth/ProtectedRoute';
import NotificationDrawer from './components/notifications/NotificationDrawer';
import { useAuth } from './context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to='/' replace />
  ) : (
    children
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/auth'
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<DashboardPage />} />
          <Route path='/expenses' element={<ExpensesPage />} />
          <Route path='/budget' element={<BudgetPage />} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          <Route path='/compare' element={<ComparePage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>

      <NotificationDrawer />

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