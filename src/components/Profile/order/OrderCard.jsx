// src/components/orders/OrderCard.jsx
import { motion } from "framer-motion"
import {ANIMATION_VARIANTS} from "@utils/animations"
import { formatPrice } from "@utils/formatters"
import { Eye, RotateCcw } from "lucide-react"
import { getStatusBadge } from "@utils/formatters"

export default function OrderCard({ order, onViewDetails }) {
  return (
    <motion.div
      key={order.id}
      className="card bg-base-200 shadow-sm"
      variants={ANIMATION_VARIANTS.item}
      whileHover={{
        y: -1,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
    >
      <div className="card-body">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold">Commande #{order.id}</h3>
              <span className={getStatusBadge(order.status)}>{order.status}</span>
            </div>
            <p className="text-sm text-base-content/70">Commandée le {order.date}</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <p className="text-xl font-bold">{formatPrice(order.amount)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-16 rounded">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-base-content/70">
                  {item.quantity} x {formatPrice(item.price_at_time_of_order)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="card-actions justify-end">
          <motion.button
            className="btn btn-ghost btn-sm gap-2"
            onClick={() => onViewDetails(order)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            Détails
          </motion.button>
          <motion.button
            className="btn btn-ghost btn-sm gap-2"
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}  
          >
            <RotateCcw className="w-4 h-4" />
            Rafraîchir
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}