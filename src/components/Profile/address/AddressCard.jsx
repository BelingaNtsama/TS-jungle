import { motion } from "framer-motion"
import { Edit, Trash2 } from "lucide-react"
import { ANIMATION_VARIANTS } from "@utils/animations"

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <motion.div
      className="card bg-base-200 shadow-sm"
      variants={ANIMATION_VARIANTS.item}
      whileHover={{ y: -2, scale: 1.01 }}
    >
      <div className="card-body relative">
        {address.default && (
          <div className="badge badge-primary absolute top-4 right-4">Par défaut</div>
        )}
        <h3 className="font-semibold text-lg">{address.name}</h3>
        <div className="text-sm text-base-content/70 space-y-1">
          <p>{address.street}</p>
          <p>
            {address.postalCode} {address.city}
          </p>
          <p>{address.country}</p>
        </div>
        <div className="card-actions justify-between mt-4">
          <div className="flex gap-2">
            <motion.button
              className="btn btn-ghost btn-sm"
              onClick={() => onEdit(address)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              onClick={() => onDelete(address.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
          {!address.default && (
            <motion.button
              className="btn btn-outline btn-primary btn-sm"
              onClick={() => onSetDefault(address.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Définir par défaut
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}