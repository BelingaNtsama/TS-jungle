// src/components/orders/OrdersList.jsx
import OrderCard from "./OrderCard"
import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from "@/utils/animations"

export default function OrdersList({ orders, onViewDetails, onReorder }) {
  return (
    <motion.div className="space-y-6" variants={ANIMATION_VARIANTS.container}>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onViewDetails={onViewDetails}
          onReorder={onReorder}
        />
      ))}
    </motion.div>
  )
}