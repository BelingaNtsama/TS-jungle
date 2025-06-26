import { create } from 'zustand';
import axiosInstance from '../../services/axiosInstance';

const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get('/admin/Orders');
      set({ 
        orders: response.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        error: "Erreur lors du chargement des commandes",
        isLoading: false
      });
      console.error("Erreur lors du chargement des commandes :", error);
    }
  }
}));

export default useOrderStore;