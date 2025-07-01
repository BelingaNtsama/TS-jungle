import { create } from "zustand"
import { devtools } from "zustand/middleware"
import axiosInstance from "@services/axiosInstance"

const OrderStore = create(
  devtools(
    (set, get) => ({
      // État
      orders: [],
      isLoading: false,
      error: null,

      // Actions
      setOrders: (orders) => set({ orders }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
       // Récupère l'ID utilisateur depuis le localStorage
      getUserId: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.id || null;
      },

      // Méthodes async
      loadOrders: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await axiosInstance.get(`/orders/${get().getUserId()}`)
          const mockOrders = response.data || [] // Simule des données de commandes
          set({ orders: mockOrders, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
        }
      },

      reorderItems: async (orderId) => {
        try {
          const order = get().orders.find((o) => o.id === orderId)
          if (!order) throw new Error("Commande non trouvée")

          // Simulation d'ajout au panier
          await new Promise((resolve) => setTimeout(resolve, 500))

          console.log(`Recommande des articles de la commande ${orderId}`)
          order.items.forEach((item) => {
            console.log(`Ajout au panier: ${item.name} x${item.quantity}`)
          })

          return { success: true, itemsCount: order.items.length }
        } catch (error) {
          set({ error: error.message })
          throw error
        }
      },

      // Reset
      reset: () => set({ orders: [], isLoading: false, error: null }),
    }),
    {
      name: "orders-store",
    },
  ),
)

export default OrderStore
