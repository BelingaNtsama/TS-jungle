import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, Package, ShoppingCart, AlertCircle, CheckCircle } from "lucide-react"

const iconMap = {
  order: ShoppingCart,
  stock: Package,
  alert: AlertCircle,
  success: CheckCircle,
}

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const Icon = iconMap[notification.type] || AlertCircle

  const bgColor =
    {
      order: "bg-info/10 text-info",
      stock: "bg-warning/10 text-warning",
      alert: "bg-error/10 text-error",
      success: "bg-success/10 text-success",
    }[notification.type] || "bg-base-200 text-base-content"

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`p-4 rounded-lg border transition-all duration-200 ${
        notification.status === "unread" ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-base-100 border-base-200"
      }`}
    >
      <div className="flex gap-3 items-start">
        <div className={`p-2 rounded-full ${bgColor} flex-shrink-0`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-base-content truncate">{notification.title}</h3>
            {notification.status === "unread" && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-xs text-primary hover:text-primary-focus whitespace-nowrap"
              >
                Marquer comme lue
              </button>
            )}
          </div>
          <p className="text-sm text-base-content/70 mt-1 line-clamp-2">{notification.message}</p>
          <p className="text-xs text-base-content/50 mt-2">
            {new Date(notification.created_at).toLocaleString("fr-FR")}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Notifications({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([])

  // Simulation de notifications en temps réel
  useEffect(() => {
    if (!isOpen) return

    // Notifications mockées
    const mockNotifications = [
      {
        id: 1,
        type: "order",
        title: "Nouvelle commande",
        message: "Commande #ORD-007 de Marie Dubois pour 299.99€",
        status: "unread",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        type: "stock",
        title: "Stock faible",
        message: "Le produit iPhone 15 Pro n'a plus que 5 unités en stock",
        status: "unread",
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        type: "success",
        title: "Produit ajouté",
        message: "Le produit MacBook Air M3 a été ajouté avec succès",
        status: "read",
        created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        type: "alert",
        title: "Commande annulée",
        message: "La commande #ORD-005 a été annulée par le client",
        status: "read",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setNotifications(mockNotifications)

    // Simulation d'une nouvelle notification après 3 secondes
    const timer = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: "order",
        title: "Nouvelle commande",
        message: "Commande #ORD-008 de Pierre Martin pour 159.50€",
        status: "unread",
        created_at: new Date().toISOString(),
      }
      setNotifications((prev) => [newNotification, ...prev])
    }, 3000)

    return () => clearTimeout(timer)
  }, [isOpen])

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, status: "read" } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "read" })))
  }

  const unreadCount = notifications.filter((n) => n.status === "unread").length

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-base-100 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-base-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="h-6 w-6 text-primary" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-content text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold">Notifications</h2>
              </div>
              <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {notifications.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                    <Bell className="h-12 w-12 text-base-content/30 mx-auto mb-4" />
                    <p className="text-base-content/50">Aucune notification</p>
                  </motion.div>
                ) : (
                  notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {unreadCount > 0 && (
              <div className="border-t border-base-200 p-4">
                <button onClick={markAllAsRead} className="btn btn-outline btn-primary w-full">
                  Tout marquer comme lu ({unreadCount})
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
