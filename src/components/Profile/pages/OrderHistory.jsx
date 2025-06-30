// src/pages/OrderHistoryPage.jsx
import { useState } from "react"
import SkeletonLoader from "@/components/shared/SkeletonLoader"
import { useOrders } from "@/hooks/profile/order/useOrders"
import EmptyOrders from "@/components/profile/order/EmptyOrders"
import OrdersList from "@/components/profile/order/OrdersList"
import OrderDetailsModal from "@/components/profile/order/OrderDetailsModal"
import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from "@/utils/animations"

export default function OrderHistoryPage() {
  const { orders, isLoading } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  if (isLoading) {
    return <SkeletonLoader type="list" count={3} />
  }

  if (orders.length === 0) {
    return <EmptyOrders />
  }

  return (
    <>
      <motion.div
        className="card bg-base-100 shadow-sm"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        <div className="card-body">
          <motion.h2 className="card-title text-2xl mb-2" variants={ANIMATION_VARIANTS.item}>
            Mes commandes
          </motion.h2>
          <motion.p className="text-base-content/70 mb-6" variants={ANIMATION_VARIANTS.item}>
            Consultez l&apos;historique de vos commandes
          </motion.p>

          <OrdersList
            orders={orders}
            onViewDetails={handleViewDetails}
          />
        </div>
      </motion.div>

      <OrderDetailsModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={selectedOrder}
      />
    </>
  )
}