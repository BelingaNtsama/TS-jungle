import { motion } from "framer-motion"
import { Mail, Phone, Edit, User } from "lucide-react"

export default function ContactInfoCard({ email, phone, onEditClick }) {
  return (
    <motion.div
      className="card bg-base-100 shadow-md"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="card-body">
        <h2 className="card-title text-xl mb-4 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
          >
            <User className="w-5 h-5 text-primary" />
          </motion.div>
          Informations de contact
        </h2>

        <div className="space-y-3">
          <ContactItem
            icon={<Mail className="w-5 h-5 text-primary" />}
            label="Email"
            value={email}
            onEditClick={onEditClick}
          />
          <ContactItem
            icon={<Phone className="w-5 h-5 text-primary" />}
            label="Téléphone"
            value={phone}
            onEditClick={onEditClick}
          />
        </div>
      </div>
    </motion.div>
  )
}

function ContactItem({ icon, label, value, onEditClick }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer"
      whileHover={{ x: 4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      onClick={onEditClick}
    >
      <motion.div whileHover={{ scale: 1.2, rotate: label === "Email" ? 10 : -10 }} transition={{ duration: 0.2 }}>
        {icon}
      </motion.div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-base-content/70">{label}</p>
        <p className="font-medium truncate">{value || "Non renseigné"}</p>
      </div>
      <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
        <Edit className="w-4 h-4 text-base-content/50" />
      </motion.div>
    </motion.div>
  )
}