import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { X, Bell, AlertCircle, CheckCircle, ShoppingBag, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import  useNotificationStore  from '../stores/notificationStore';

const iconMap = {
  order: ShoppingBag,
  stock: Package,
  alert: AlertCircle,
  success: CheckCircle
};

const NotificationItem = ({ notification }) => {
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const Icon = iconMap[notification.type] || AlertCircle;

  const bgColor = {
    order: 'bg-blue-100 text-blue-600',
    stock: 'bg-yellow-100 text-yellow-600',
    alert: 'bg-red-100 text-red-600',
    success: 'bg-green-100 text-green-600'
  }[notification.type] || 'bg-gray-100 text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-lg mb-2 shadow-sm ${
        notification.status === 'unread'
          ? 'bg-blue-50 border-l-4 border-blue-500'
          : 'bg-white border-l-4 border-transparent'
      }`}
    >
      <div className="flex gap-3 items-start">
        <div className={`p-2 rounded-full ${bgColor} flex-shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-gray-900 truncate">{notification.title}</h3>
            {notification.status === 'unread' && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap"
              >
                Marquer comme lue
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(notification.created_at).toLocaleString('fr-FR', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Notifications = ({ isOpen, onClose }) => {
  const { notifications, addNotification, markAllAsRead } = useNotificationStore();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const socket = io('http://localhost:3000', {
      reconnectionAttempts: Infinity,
      randomizationFactor: 0.5,
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Connecté au serveur ✅');
      const userId = '2c48bc11-fbfa-418f-8e6f-dbe03fba1e95';
      socket.emit('authenticate', userId);
      setIsConnected(true);
    });

    socket.on('order_created', (notification) => {
      console.log('🧩 Notification reçue :', notification);
      addNotification({
        ...notification,
        status: 'unread'
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Déconnecté ❌');
    });

    return () => {
      socket.disconnect();
    };
  }, [isOpen]);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="h-6 w-6 text-blue-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                {!isConnected && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Hors ligne
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {notifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucune notification</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification,index) => (
                      <NotificationItem notification={notification} key={index}/>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {unreadCount > 0 && (
              <div className="border-t border-gray-200 p-3">
                <button
                  onClick={markAllAsRead}
                  className="w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                >
                  Tout marquer comme lu ({unreadCount})
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Notifications;