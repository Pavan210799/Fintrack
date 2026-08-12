import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { notificationsData } from '../components/notifications/notificationsData';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState(notificationsData);

  const openNotifications = () => setIsOpen(true);

  const closeNotifications = () => setIsOpen(false);

  const toggleNotifications = () =>
    setIsOpen((prev) => !prev);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => notification.id !== id
      )
    );
  };

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => !notification.read
      ).length,
    [notifications]
  );

  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        notifications,
        unreadCount,
        openNotifications,
        closeNotifications,
        toggleNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () =>
  useContext(NotificationContext);