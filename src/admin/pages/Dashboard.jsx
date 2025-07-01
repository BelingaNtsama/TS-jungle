import { motion } from "framer-motion"
import Metric from "@admin/components/dashboard/Metric"
import Graphic from "@admin/components/dashboard/Graphic"
import useDashboardStore from "@admin/stores/dashboardStore"
import { useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const Dashboard = () => {
  const {
    loading,
    error,
    fetchDashboardData,
    getFormattedMetrics,
    getFormattedCharts
  } = useDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  )

  if (error) return (
    <div className="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Erreur lors du chargement des données: {error}</span>
      </div>
    </div>
  )

  return (
    <motion.div 
      className="space-y-6" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      {/* Métriques principales */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50"
        variants={containerVariants}
      >
        {getFormattedMetrics().map((metric, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Metric {...metric} />
          </motion.div>
        ))}
      </motion.div>

      {/* Graphiques */}
      <motion.div 
        className="grid gap-4 lg:grid-cols-3"
        variants={containerVariants}
      >
        {getFormattedCharts().map((graph, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className={index === 0 ? "lg:col-span-2" : ""}
          >
            <Graphic {...graph} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Dashboard