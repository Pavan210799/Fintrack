import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useTheme } from '../../context/ThemeContext';

import CompareHeader from '../../components/compare/CompareHeader';
import CompareTable from '../../components/compare/CompareTable';
import PageSkeleton from '../../components/common/PageSkeleton';

import PageTransition from '../../components/common/PageTransition';

import './ComparePage.css';

const ComparePage = () => {
  const { openSidebar } = useOutletContext();
  const { theme, toggleTheme } = useTheme();

  const [leftMonth, setLeftMonth] = useState('2026-07');
  const [rightMonth, setRightMonth] = useState('2026-08');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const months = [
    { value: '2026-08', label: 'August 2026' },
    { value: '2026-07', label: 'July 2026' },
    { value: '2026-06', label: 'June 2026' },
    { value: '2026-05', label: 'May 2026' },
    { value: '2026-04', label: 'April 2026' },
    { value: '2026-03', label: 'March 2026' },
  ];

  const handleLeftChange = (value) => {
    if (value === rightMonth) return;
    setLeftMonth(value);
  };

  const handleRightChange = (value) => {
    if (value === leftMonth) return;
    setRightMonth(value);
  };

  return (
    <div className='compare-page'>
      <CompareHeader
        theme={theme}
        toggleTheme={toggleTheme}
        openSidebar={openSidebar}
      />

      {loading ? (
        <PageSkeleton />
      ) : (
        <PageTransition>
          <div className='compare-page'>
            <CompareTable
              leftMonth={leftMonth}
              rightMonth={rightMonth}
              months={months}
              onLeftChange={handleLeftChange}
              onRightChange={handleRightChange}
            />
          </div>
        </PageTransition>
      )}
    </div>
  );
};

export default ComparePage;