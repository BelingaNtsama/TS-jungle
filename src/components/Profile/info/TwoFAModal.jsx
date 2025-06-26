import { motion } from "framer-motion"
import { AlertCircle, X, Check, Shield, Smartphone } from "lucide-react"

export default function TwoFAModal({ isOpen, onClose, onEnable }) {
  if (!isOpen) return null

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <motion.div
        className="modal-box w-full max-w-md shadow-2xl border border-base-300"
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
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Shield className="w-6 h-6" />
          </motion.div>
          <span>Activer la 2FA</span>
        </motion.h3>

        <div className="space-y-6">
          <motion.p
            className="text-sm text-base-content/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            La vérification en deux étapes ajoute une sécurité supplémentaire à votre compte en 
            nécessitant un code unique en plus de votre mot de passe.
          </motion.p>

          <motion.div
            className="alert alert-info bg-info/10 border-info/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Smartphone className="w-5 h-5 text-info" />
            <span className="text-sm">
              Vous aurez besoin d'une application d'authentification comme Google Authenticator ou Authy.
            </span>
          </motion.div>

          <motion.div
            className="alert bg-base-200 border-base-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AlertCircle className="w-5 h-5 text-warning" />
            <span className="text-sm">
              Après activation, vous devrez scanner un QR code et saisir un code de vérification.
            </span>
          </motion.div>

          <motion.div
            className="modal-action mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
              Plus tard
            </motion.button>
            <motion.button
              type="button"
              className="btn btn-primary gap-2"
              onClick={onEnable}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Check className="w-4 h-4" />
              Activer maintenant
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}