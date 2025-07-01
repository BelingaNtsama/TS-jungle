import { useEffect } from "react"
import usePaymentStore from "@stores/paymentStore"

export const usePaymentMethods = () => {
  const {
    paymentMethods,
    isLoading,
    error,
    loadPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    reset,
  } = usePaymentStore()

  useEffect(() => {
    if (paymentMethods.length === 0 && !isLoading) {
      loadPaymentMethods()
    }
  }, [])

  return {
    paymentMethods,
    isLoading,
    error,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    reset,
    refetch: loadPaymentMethods,
  }
}

export default usePaymentMethods
