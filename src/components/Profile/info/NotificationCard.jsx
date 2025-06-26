import { motion } from "framer-motion"
import { Bell, Mail, Award, Check, X, Settings } from "lucide-react"

export default function NotificationCard({ newsletter, offers }) {
  return (
    <motion.div
      className="card bg-base-100 shadow-md"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="card-body">
        <h2 className="card-title text-xl mb-4 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
          >
            <Bell className="w-5 h-5 text-primary" />
          </motion.div>
          Notifications
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
            <Settings className="w-4 h-4 text-base-content/50 ml-auto" />
          </motion.div>
        </h2>

        <div className="space-y-3">
          <NotificationItem
            active={newsletter}
            icon={<Mail className="w-3 h-3 text-base-content/50" />}
            title="Newsletter"
            description="Conseils et nouveautés"
          />
          <NotificationItem
            active={offers}
            icon={<Award className="w-3 h-3 text-base-content/50" />}
            title="Offres spéciales"
            description="Promotions exclusives"
          />
        </div>
      </div>
    </motion.div>
  )
}

function NotificationItem({ active, icon, title, description }) {
  return (
    <motion.div
      className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
      whileHover={{ scale: 1.01, x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className={`w-3 h-3 rounded-full ${active ? "bg-success" : "bg-error"}`}
          animate={{
            scale: active ? [1, 1.3, 1] : [1, 1.1, 1],
            boxShadow: active
              ? ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 6px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
              : ["0 0 0 0 rgba(239, 68, 68, 0.4)", "0 0 0 6px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
        />
        <div>
          <p className="font-medium flex items-center gap-2">
            {title}
            <motion.span whileHover={{ scale: 1.1 }}>{icon}</motion.span>
          </p>
          <p className="text-sm text-base-content/70">{description}</p>
        </div>
      </div>
      <motion.span
        className={`badge ${active ? "badge-success" : "badge-error"} gap-1`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          animate={{ rotate: active ? [0, 360] : [0, -360] }}
          transition={{ duration: 0.5 }}
          key={active ? "active" : "inactive"}
        >
          {active ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
        </motion.span>
        {active ? "Activé" : "Désactivé"}
      </motion.span>
    </motion.div>
  )
}