import { useEffect } from "react"
import OrderStore from "@/stores/orderStore"

export const useOrders = () => {
  const { orders, isLoading, error, loadOrders, reorderItems, reset } = OrderStore()
  console.log("Orders:", orders, "Loading:", isLoading, "Error:", error) 

  useEffect(() => {
    if (orders.length === 0 && !isLoading) {
      loadOrders()
    }
  }, [])

  return {
    orders,
    isLoading,
    error,
    reorderItems,
    reset,
    refetch: loadOrders,
  }
}

export default useOrders
