import { motion } from "framer-motion"
import { Shield, AlertCircle, Eye, Calendar, Check } from "lucide-react"

export default function SecurityCard({ onPasswordChange, onEnable2FA }) {
  return (
    <motion.div
      className="card bg-base-100 shadow-md"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="card-body">
        <h2 className="card-title text-xl mb-4 flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          >
            <Shield className="w-5 h-5 text-primary" />
          </motion.div>
          Sécurité et confidentialité
          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
            <Eye className="w-4 h-4 text-base-content/50 ml-auto" />
          </motion.div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SecurityStat
            icon={<Shield className="w-3 h-3" />}
            title="Mot de passe"
            value="Modifié il y a 3 mois"
            color="warning"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
          />
          <SecurityStat
            icon={<AlertCircle className="w-3 h-3" />}
            title="2FA"
            value="Non activée"
            color="error"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.3, 1],
            }}
          />
          <SecurityStat
            icon={<Check className="w-3 h-3" />}
            title="Connexion"
            value="Aujourd'hui 14:30"
            color="success"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0 0 rgba(34, 197, 94, 0.4)",
                "0 0 0 4px rgba(34, 197, 94, 0)",
                "0 0 0 0 rgba(34, 197, 94, 0)",
              ],
            }}
          />
          <SecurityStat
            icon={<Calendar className="w-3 h-3" />}
            title="Localisation"
            value="Paris, France"
            color="info"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.6, 1],
            }}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <SecurityButton
            icon={<Shield className="w-4 h-4" />}
            text="Changer le mot de passe"
            onClick={onPasswordChange}
          />
          <SecurityButton
            icon={<AlertCircle className="w-4 h-4" />}
            text="Activer 2FA"
            onClick={onEnable2FA}
            color="secondary"
          />
        </div>
      </div>
    </motion.div>
  )
}

function SecurityStat({ icon, title, value, color, animate }) {
  return (
    <motion.div
      className={`bg-gradient-to-br from-${color}/10 to-${color}/5 border border-${color}/20 rounded-lg p-4`}
      whileHover={{ scale: 1.02, y: -2, rotate: Math.random() > 0.5 ? 1 : -1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          className={`w-2 h-2 bg-${color} rounded-full`}
          animate={animate}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <span className="font-medium text-sm flex items-center gap-1">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
            {icon}
          </motion.div>
          {title}
        </span>
      </div>
      <p className="text-xs text-base-content/70">{value}</p>
    </motion.div>
  )
}

function SecurityButton({ icon, text, onClick, color = "primary" }) {
  return (
    <motion.button
      className={`btn btn-outline btn-${color} btn-sm gap-2`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
        {icon}
      </motion.div>
      {text}
    </motion.button>
  )
}