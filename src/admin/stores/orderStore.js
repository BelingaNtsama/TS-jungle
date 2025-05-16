import { create } from 'zustand';
import axiosInstance from "@/services/axiosInstance"

const statusConfig = {
  Delivered: { icon: 'CheckCircle', color: 'green' },
  Shipped: { icon: 'Truck', color: 'blue' },
  Processing: { icon: 'Package', color: 'yellow' },
  Pending: { icon: 'Clock', color: 'orange' },
  Cancelled: { icon: 'AlertCircle', color: 'red' }
};

const priorityConfig = {
  High: 'red',
  Normal: 'blue',
  Low: 'gray'
};

const useOrderStore = create((set, get) => ({
    orders: [],
    filteredOrders: [],
    stats: {},
    loading: false,
    error: null,
    searchText: '',
    statusFilter: 'All',
    dateFilter: null,
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1
    },

    // Actions
    setSearchText: (text) => {
      set({ searchText: text, pagination: { ...get().pagination, currentPage: 1 } });
      get().applyFilters();
    },
    setStatusFilter: (status) => {
      set({ statusFilter: status, pagination: { ...get().pagination, currentPage: 1 } });
      get().applyFilters();
    },
    setDateFilter: (date) => {
      set({ dateFilter: date, pagination: { ...get().pagination, currentPage: 1 } });
      get().applyFilters();
    },
    setPage: (page) => set({ pagination: { ...get().pagination, currentPage: page } }),

    // Fetch data from API
    fetchOrders: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axiosInstance.get("/admin/orders")
        const data = await response.data
        
        set({
          orders: data,
          loading: false,
          filteredOrders: data,
          stats: get().calculateStats(data)
        });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    // Filter logic
    applyFilters: () => {
      const { orders, searchText, statusFilter, dateFilter } = get();
      
      let filtered = [...orders];
      
      // Text search
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        filtered = filtered.filter(order => 
          Object.values(order).some(
            val => val?.toString().toLowerCase().includes(searchLower)
          )
        );
      }
      
      // Status filter
      if (statusFilter !== 'All') {
        filtered = filtered.filter(order => order.status === statusFilter);
      }
      
      // Date filter
      if (dateFilter) {
        filtered = filtered.filter(order => 
          new Date(order.date).toDateString() === new Date(dateFilter).toDateString()
        );
      }
      
      // Update pagination
      const totalPages = Math.ceil(filtered.length / get().pagination.itemsPerPage);
      
      set({ 
        filteredOrders: filtered,
        stats: get().calculateStats(filtered),
        pagination: {
          ...get().pagination,
          totalPages: totalPages || 1,
          currentPage: Math.min(get().pagination.currentPage, totalPages || 1)
        }
      });
    },

    // Calculate statistics
    calculateStats: (orders) => {
      const total = orders.length;
      const statusCounts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});
      
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      
      return {
        total,
        totalRevenue,
        ...statusCounts
      };
    },

    // Get paginated data
    getPaginatedOrders: () => {
      const { filteredOrders, pagination } = get();
      const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const end = start + pagination.itemsPerPage;
      return filteredOrders.slice(start, end);
    },

    // Render helpers
    getStatusStyle: (status) => statusConfig[status] || { icon: 'Clock', color: 'gray' },
    getPriorityColor: (priority) => priorityConfig[priority] || 'gray'
  }))

export default useOrderStore;