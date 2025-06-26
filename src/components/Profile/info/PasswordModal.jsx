import { motion } from "framer-motion"
import { Shield, X, Check, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function PasswordModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <motion.div
        className="modal-box w-full max-w-md shadow-xl border border-base-300"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <form method="dialog">
          <motion.button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-error hover:bg-error/10"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </form>

        <motion.h3 
          className="font-bold text-xl mb-6 flex items-center gap-3 text-primary"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Shield className="w-6 h-6" />
          </motion.div>
          <span>Changer le mot de passe</span>
        </motion.h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <PasswordInput
            type="password"
            name="currentPassword"
            label="Mot de passe actuel"
            delay={0.1}
            required
          />
          <PasswordInput
            type="password"
            name="newPassword"
            label="Nouveau mot de passe"
            delay={0.2}
            required
          />
          <PasswordInput
            type="password"
            name="confirmPassword"
            label="Confirmer le nouveau mot de passe"
            delay={0.3}
            required
          />

          <motion.div
            className="modal-action mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              type="button"
              className="btn btn-ghost gap-2"
              onClick={onClose}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <X className="w-4 h-4" />
              Annuler
            </motion.button>
            <motion.button
              type="submit"
              className="btn btn-primary gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Check className="w-4 h-4" />
              Confirmer
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

function PasswordInput({ type, name, label, delay = 0, required = false }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      className="form-control"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
    >
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <motion.div
        className={`relative ${isFocused ? 'ring-1 ring-primary' : ''} rounded-btn transition-all`}
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
      >
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Lock className="w-4 h-4 text-base-content/70" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className="input input-bordered w-full pl-10 pr-10"
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-xs"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-base-content/70" />
          ) : (
            <Eye className="w-4 h-4 text-base-content/70" />
          )}
        </button>
      </motion.div>
    </motion.div>
  )
}