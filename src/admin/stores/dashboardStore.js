import { create } from 'zustand'
import { DollarSign, ShoppingCart, Users, Package, TrendingDown, TrendingUp } from "lucide-react"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import axiosInstance from "@/services/axiosInstance"

const useDashboardStore = create((set, get) => ({
  metrics: null,
  charts: {
    sales: null,
    orders: null,
    categories: null
  },
  loading: false,
  error: null,

  // Fetch all dashboard data
  fetchDashboardData: async () => {
    set({ loading: true, error: null })
    try {
      const [metricsRes, salesRes, ordersRes, categoriesRes] = await Promise.all([
        axiosInstance.get('/admin/dashboard/metrics'),
        axiosInstance.get('/admin/dashboard/sales'),
        axiosInstance.get('/admin/dashboard/orders'),
        axiosInstance.get('/admin/dashboard/categories')
      ])

      const [metrics, sales, orders, categories] = await Promise.all([
        metricsRes.data,
        salesRes.data,
        ordersRes.data,
        categoriesRes.data
      ])

      set({
        metrics,
        charts: {
          sales,
          orders,
          categories
        },
        loading: false
      })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Dashboard fetch error:', error)
    }
  },

  // Formatted data for components
  getFormattedMetrics: () => {
    const { metrics } = get()
    if (!metrics) return []

    return [
      {
        title: "Revenus Totaux",
        value: metrics.totalRevenue,
        pourcentage: metrics.revenueGrowth,
        Trending: metrics.revenueGrowth >= 0 ? TrendingUp : TrendingDown,
        Icon: DollarSign,
        color: "primary"
      },
      {
        title: "Commandes",
        value: metrics.totalOrders,
        pourcentage: metrics.ordersGrowth,
        Trending: metrics.ordersGrowth >= 0 ? TrendingUp : TrendingDown,
        Icon: ShoppingCart,
        color: "success"
      },
      {
        title: "Clients actifs",
        value: metrics.activeCustomers,
        pourcentage: metrics.customersGrowth,
        Trending: metrics.customersGrowth >= 0 ? TrendingUp : TrendingDown,
        Icon: Users,
        color: "info"
      },
      {
        title: "Produits vendus",
        value: metrics.productsSold,
        pourcentage: metrics.productsGrowth,
        Trending: metrics.productsGrowth >= 0 ? TrendingUp : TrendingDown,
        Icon: Package,
        color: "warning"
      }
    ]
  },

  getFormattedCharts: () => {
    const { charts } = get()
    if (!charts.sales) return []

    return [
      {
        title: "Évolution des ventes",
        description: "Ventes mensuelles en euros",
        Graph: Bar,
        data: {
          labels: charts.sales.labels,
          datasets: [{
            label: "Ventes (€)",
            data: charts.sales.data,
            backgroundColor: "rgba(59, 130, 246, 0.5)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1
          }]
        }
      },
      {
        title: "Commandes par jour",
        description: "Nombre de commandes cette semaine",
        Graph: Line,
        data: {
          labels: charts.orders.labels,
          datasets: [{
            label: "Commandes",
            data: charts.orders.data,
            fill: false,
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.1
          }]
        }
      },
      {
        title: "Répartition par catégorie",
        description: "Ventes par catégorie",
        Graph: Doughnut,
        data: {
          labels: charts.categories.labels,
          datasets: [{
            data: charts.categories.data,
            backgroundColor: [
              "rgba(239, 68, 68, 0.8)",
              "rgba(59, 130, 246, 0.8)",
              "rgba(34, 197, 94, 0.8)",
              "rgba(251, 191, 36, 0.8)",
              "rgba(168, 85, 247, 0.8)"
            ],
            borderWidth: 0
          }]
        }
      }
    ]
  }
}))

export default useDashboardStore