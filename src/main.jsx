import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProvider } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

import './theme/theme.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <FinanceProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);