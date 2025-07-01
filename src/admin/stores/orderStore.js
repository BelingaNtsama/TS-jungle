import {create} from 'zustand';
import axiosInstance from '@services/axiosInstance';

 const useOrderStore = create((set) => ({
  // État initial
  orders: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    delivered: 0,
    processing: 0,
    canceling: 0,
    totalRevenue: 0
  },
  
  // Action pour récupérer les commandes
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/admin/orders');
      const orders = response.data;
      
      // Calcul des statistiques
      const stats = {
        total: orders.length,
        delivered: orders.filter(o => o.status === 'Delivered').length,
        processing: orders.filter(o => o.status === 'Processing').length,
        canceling: orders.filter(o => o.status === 'Canceling').length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
      };
      
      set({ orders, stats, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
    }
  },
  
  // Action pour mettre à jour une commande
  updateOrder: async (orderId, updates) => {
    try {
      // Optimistic update
      set(state => ({
        orders: state.orders.map(order => 
          order.id === orderId ? { ...order, ...updates } : order
        )
      }));
      
      // Appel API
      await axiosInstance.patch(`/admin/orders/${orderId}`, updates);
      
      // Recalcul des stats après mise à jour
      set(state => {
        const updatedOrders = state.orders.map(order => 
          order.id === orderId ? { ...order, ...updates } : order
        );
        
        const stats = {
          total: updatedOrders.length,
          delivered: updatedOrders.filter(o => o.status === 'Delivered').length,
          processing: updatedOrders.filter(o => o.status === 'Processing').length,
          canceling: updatedOrders.filter(o => o.status === 'Canceling').length,
          totalRevenue: updatedOrders.reduce((sum, order) => sum + order.total, 0)
        };
        
        return { orders: updatedOrders, stats };
      });
      
      return true;
    } catch (error) {
      // Rollback en cas d'erreur
      set(state => ({
        orders: state.orders.map(order => 
          order.id === orderId 
            ? { ...order, ...state.orders.find(o => o.id === orderId) } 
            : order
        )
      }));
      
      console.error('Update failed:', error);
      return false;
    }
  },
  
  // Action pour annuler une commande
  cancelOrder: async (orderId) => {
    return useOrderStore.getState().updateOrder(orderId, { status: 'Cancelled' });
  },
  
  // Action pour marquer comme livré
  markAsDelivered: async (orderId) => {
    return useOrderStore.getState().updateOrder(orderId, { status: 'Delivered' });
  },
  
  // Reset du store
  reset: () => set({ 
    orders: [], 
    loading: false, 
    error: null, 
    stats: {
      total: 0,
      delivered: 0,
      processing: 0,
      canceling: 0,
      totalRevenue: 0
    }
  })
}));

export default useOrderStore;