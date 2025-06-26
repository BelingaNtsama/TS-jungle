import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, X, Info } from "lucide-react"

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: "alert-success",
  error: "alert-error",
  info: "alert-info",
}

export function ToastNotification({ toast, onRemove }) {
  const [isVisible, setIsVisible] = useState(true)
  const Icon = icons[toast.type] || Info

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, toast.duration || 4000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.3 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.5 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
          className={`alert ${colors[toast.type]} shadow-lg mb-2`}
        >
          <Icon className="w-5 h-5" />
          <div className="flex-1">
            <h3 className="font-bold">{toast.title}</h3>
            {toast.message && <div className="text-sm opacity-90">{toast.message}</div>}
          </div>
          <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastNotification key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}
