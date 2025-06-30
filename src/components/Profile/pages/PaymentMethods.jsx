// src/pages/PaymentMethodsPage.jsx
import { useState } from "react"
import SkeletonLoader from "@/components/shared/SkeletonLoader"
import usePaymentMethods from "@/hooks/Profile/payment/useMethods"
import { usePaymentActions } from "@/hooks/Profile/payment/useActions"
import EmptyPayments from "@/components/Profile/payment/EmptyPayments"
import PaymentCard from "@/components/Profile/payment/PaymentCard"
import PaymentMethodModal from "@/components/Profile/payment/PaymentMethodModal"
import { PAYMENT_TYPES } from "@/utils/constants"
import {ANIMATION_VARIANTS} from "@/utils/animations" 
import { motion } from "framer-motion"
import { Plus } from "lucide-react"

export default function PaymentMethodsPage() {
  const { paymentMethods, isLoading } = usePaymentMethods()
  const { handleSetDefault, handleDelete, handleAddPaymentMethod } = usePaymentActions()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES.CARD)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let newMethod
    if (paymentType === PAYMENT_TYPES.CARD) {
      const cardNumber = formData.get("cardNumber")
      const brand = formData.get("brand")
      const expMonth = formData.get("expMonth")
      const expYear = formData.get("expYear")
      const cvv = formData.get("cvv")
      newMethod = {
        type: PAYMENT_TYPES.CARD,
        brand,
        cvv : cvv,
        expMonth,
        expYear,
      }
    } else {
      const email = formData.get("email")
      newMethod = {
        type: PAYMENT_TYPES.PAYPAL,
        email,
      }
    }
    await handleAddPaymentMethod(newMethod)
    setIsAddModalOpen(false)
  }

  if (isLoading) {
    return <SkeletonLoader type="card" count={3} />
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
            Moyens de paiement
          </motion.h2>
          <motion.p className="text-base-content/70 mb-6" variants={ANIMATION_VARIANTS.item}>
            Gérez vos moyens de paiement
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={ANIMATION_VARIANTS.container}
          >
            {paymentMethods.length === 0 ? (
              <EmptyPayments />
            ) : (
              <>
                {paymentMethods.map((method) => (
                  <PaymentCard
                    key={method.id}
                    method={method}
                    onSetDefault={handleSetDefault}
                    onDelete={handleDelete}
                  />
                ))}
                <div className="card bg-base-200 border-2 border-dashed border-base-300 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setIsAddModalOpen(true)}>
                  <div className="card-body items-center text-center justify-center min-h-[160px]">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <Plus className="w-12 h-12 text-base-content/30 mb-4" />
                    </motion.div>
                    <h3 className="font-semibold mb-2">Ajouter un moyen de paiement</h3>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>

      <PaymentMethodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}