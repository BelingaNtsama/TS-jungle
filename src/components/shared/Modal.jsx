import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import PropTypes from "prop-types"

const ANIMATION_VARIANTS = {
  modal: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }
}

export function ModalCloseButton({ onClose }) {
  return (
    <motion.button
      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      onClick={onClose}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <X className="w-4 h-4" />
    </motion.button>
  )
}

ModalCloseButton.propTypes = {
  onClose: PropTypes.func.isRequired
}

export function ModalActionButtons({
  onConfirm,
  onCancel,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  confirmVariant = "primary"
}) {
  return (
    <div className="modal-action">
      {onCancel && (
        <motion.button
          className="btn btn-ghost"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {cancelText}
        </motion.button>
      )}
      {onConfirm && (
        <motion.button
          className={`btn btn-${confirmVariant}`}
          onClick={onConfirm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {confirmText}
        </motion.button>
      )}
    </div>
  )
}

ModalActionButtons.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmVariant: PropTypes.string
}

function Modal({ isOpen, onClose, className = "w-11/12 max-w-2xl", children }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="modal modal-open">
          <motion.div
            className={`modal-box ${className}`}
            variants={ANIMATION_VARIANTS.modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalCloseButton onClose={onClose} />
            {children}
          </motion.div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={onClose}>close</button>
          </form>
        </div>
      )}
    </AnimatePresence>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Modal
