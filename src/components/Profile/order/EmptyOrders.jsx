// src/components/orders/EmptyOrders.jsx
import { motion } from "framer-motion"
import { Package } from "lucide-react"
import { Link } from "react-router"

export default function EmptyOrders() {
  return (
    <motion.div
      className="card bg-base-100 shadow-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body text-center py-16">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        >
          <Package className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
        </motion.div>
        <motion.h3
          className="text-xl font-semibold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Aucune commande
        </motion.h3>
        <motion.p
          className="text-base-content/70 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Vous n&apos;avez pas encore passé de commande.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="btn btn-primary">
            Découvrir nos plantes
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}