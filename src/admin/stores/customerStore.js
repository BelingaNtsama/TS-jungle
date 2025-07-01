import { create } from 'zustand';
import axiosInstance from "@services/axiosInstance"

const useCustomerStore = create((set, get) => ({
  customers: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    active: 0,
    vip: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
  },

  // Fetch customers from API
  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/customers")
      const data = await response.data
      
      // Calculate statistics
      const stats = {
        total: data.length,
        active: data.filter(c => c.status === 'Active').length,
        vip: data.filter(c => c.status === 'VIP').length,
        totalRevenue: data.reduce((sum, customer) => sum + customer.total_orders, 0),
        avgOrderValue: data.reduce((sum, customer) => {
          return sum + (customer.total_orders / (customer.order_count || 1));
        }, 0) / data.length,
      };

      set({ 
        customers: data,
        stats,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update customer status
  updateCustomerStatus: async (customerId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      // Update local state
      set(state => ({
        customers: state.customers.map(customer => 
          customer.id === customerId 
            ? { ...customer, status: newStatus } 
            : customer
        ),
        stats: {
          ...state.stats,
          active: newStatus === 'Active' 
            ? state.stats.active + 1 
            : state.stats.active - (customer.status === 'Active' ? 1 : 0),
          vip: newStatus === 'VIP' 
            ? state.stats.vip + 1 
            : state.stats.vip - (customer.status === 'VIP' ? 1 : 0),
        }
      }));
    } catch (error) {
      console.error('Error updating customer status:', error);
      throw error;
    }
  },

  // Export customers
  exportCustomers: async () => {
    try {
      const response = await fetch('/api/admin/customers/export');
      if (!response.ok) throw new Error('Export failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'customers_export.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  },
}));

export default useCustomerStore;