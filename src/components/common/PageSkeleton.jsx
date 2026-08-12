import './PageSkeleton.css';

const PageSkeleton = () => {
  return (
    <div className='page-skeleton'>
      <div className='skeleton-header'>
        <div className='skeleton-title-group'>
          <div className='skeleton skeleton-title'></div>
          <div className='skeleton skeleton-subtitle'></div>
        </div>

        <div className='skeleton-actions'>
          <div className='skeleton skeleton-action'></div>
          <div className='skeleton skeleton-action'></div>
          <div className='skeleton skeleton-avatar'></div>
        </div>
      </div>

      <div className='skeleton-cards'>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className='skeleton-card'>
            <div className='skeleton skeleton-card-title'></div>
            <div className='skeleton skeleton-card-value'></div>
            <div className='skeleton skeleton-card-line'></div>
          </div>
        ))}
      </div>

      <div className='skeleton-content'>
        <div className='skeleton-chart'>
          <div className='skeleton skeleton-chart-header'></div>
          <div className='skeleton skeleton-chart-body'></div>
        </div>

        <div className='skeleton-table'>
          <div className='skeleton skeleton-table-header'></div>

          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className='skeleton-table-row'>
              <div className='skeleton skeleton-cell'></div>
              <div className='skeleton skeleton-cell short'></div>
              <div className='skeleton skeleton-cell medium'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;