// src/components/payments/PaymentCard.jsx
import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from "@utils/animations"
import { Trash2 } from "lucide-react"
import { CARD_BRANDS, PAYMENT_TYPES } from "@utils/constants"

export default function PaymentCard({
  method,
  onSetDefault,
  onDelete,
}) {
  const getCardBrand = (brand) => {
    const brands = {
      [CARD_BRANDS.VISA]: { name: "VISA", color: "text-blue-600" },
      [CARD_BRANDS.MASTERCARD]: { name: "MC", color: "text-red-600" },
    }
    return brands[brand] || { name: brand.toUpperCase(), color: "text-gray-600" }
  }

  return (
    <motion.div
      key={method.id}
      className="card bg-base-200 shadow-sm"
      variants={ANIMATION_VARIANTS.item}
      whileHover={{ y: -1, scale: 1.01 }}
    >
      <div className="card-body relative">
        {method.default && <div className="badge badge-primary absolute top-4 right-4">Par défaut</div>}
        <div className="flex items-center gap-4">
          {method.type === PAYMENT_TYPES.CARD ? (
            <div className="w-16 h-10 bg-base-100 rounded flex items-center justify-center">
              <span className={`font-bold text-sm ${getCardBrand(method.brand).color}`}>
                {getCardBrand(method.brand).name}
              </span>
            </div>
          ) : (
            <div className="w-16 h-10 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">PayPal</span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold">
              {method.type === PAYMENT_TYPES.CARD
                ? `${method.brand?.charAt(0).toUpperCase()}${method.brand?.slice(1)} se terminant par ${method.last4}`
                : "Compte PayPal"}
            </h3>
            <p className="text-sm text-base-content/70">
              {method.type === PAYMENT_TYPES.CARD
                ? `Expire ${method.expMonth}/${method.expYear}`
                : method.email}
            </p>
          </div>
        </div>
        <div className="card-actions justify-between mt-4">
          <motion.button
            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
            onClick={() => onDelete(method.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
          {!method.default && (
            <motion.button
              className="btn btn-outline btn-primary btn-sm"
              onClick={() => onSetDefault(method.id)}
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