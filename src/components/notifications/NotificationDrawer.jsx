import {
  LuBell,
  LuCircleCheck,
  LuTriangleAlert,
  LuPiggyBank,
  LuWallet,
  LuCalendar,
  LuChartColumn,
  LuTrash2,
  LuX,
} from 'react-icons/lu';

import { useNotifications } from '../../context/NotificationContext';
import './NotificationDrawer.css';

const iconMap = {
  income: LuWallet,
  expense: LuWallet,
  budget: LuPiggyBank,
  savings: LuPiggyBank,
  warning: LuTriangleAlert,
  success: LuCircleCheck,
  reminder: LuCalendar,
  report: LuChartColumn,
};

const colorClass = {
  income: 'income',
  expense: 'expense',
  budget: 'budget',
  savings: 'savings',
  warning: 'warning',
  success: 'success',
  reminder: 'reminder',
  report: 'report',
};

const sectionTitles = {
  today: 'Today',
  week: 'This week',
  earlier: 'Earlier',
};

const NotificationDrawer = () => {
  const {
    isOpen,
    notifications,
    unreadCount,
    closeNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const groupedNotifications = {
    today: notifications.filter(
      (notification) => notification.section === 'today'
    ),
    week: notifications.filter(
      (notification) => notification.section === 'week'
    ),
    earlier: notifications.filter(
      (notification) => notification.section === 'earlier'
    ),
  };

  return (
    <>
      {isOpen && (
        <div
          className='notification-backdrop'
          onClick={closeNotifications}
        />
      )}

      <aside
        className={`notification-drawer ${
          isOpen ? 'open' : ''
        }`}
      >
        <div className='notification-header'>
          <div className='notification-header-left'>
            <div className='notification-header-icon'>
              <LuBell />
            </div>

            <div>
              <h3>Notifications</h3>
              <p>
                {unreadCount} unread notification
                {unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            className='notification-close'
            onClick={closeNotifications}
          >
            <LuX />
          </button>
        </div>

        <div className='notification-toolbar'>
          <button
            className='mark-all-read'
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>

        <div className='notification-content'>
          {Object.entries(groupedNotifications).map(
            ([section, items]) =>
              items.length > 0 && (
                <div
                  key={section}
                  className='notification-section'
                >
                  <h4>{sectionTitles[section]}</h4>

                  {items.map((notification) => {
                    const Icon =
                      iconMap[notification.type] ||
                      LuBell;

                    const iconColor =
                      colorClass[notification.type] ||
                      'income';

                    return (
                      <div
                        key={notification.id}
                        className={`notification-item ${
                          !notification.read
                            ? 'unread'
                            : ''
                        }`}
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                      >
                        <div
                          className={`notification-icon ${iconColor}`}
                        >
                          <Icon />
                        </div>

                        <div className='notification-body'>
                          <div className='notification-title-row'>
                            <strong>
                              {notification.title}
                            </strong>

                            {!notification.read && (
                              <span className='notification-unread-dot' />
                            )}
                          </div>

                          <p>
                            {notification.message}
                          </p>

                          <span className='notification-time'>
                            {notification.time}
                          </span>
                        </div>

                        <button
                          className='notification-delete'
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteNotification(
                              notification.id
                            );
                          }}
                        >
                          <LuTrash2 />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )
          )}

          {notifications.length === 0 && (
            <div className='notification-empty'>
              <LuBell />
              <h4>No notifications</h4>
              <p>You're all caught up.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default NotificationDrawer;