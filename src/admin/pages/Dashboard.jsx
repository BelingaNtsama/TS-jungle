"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { Bar, Line, Doughnut } from "react-chartjs-2"
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

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement)

const Dashboard = () => {
  const salesData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
    datasets: [
      {
        label: "Ventes (€)",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  }

  const ordersData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Commandes",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.1,
      },
    ],
  }

  const categoryData = {
    labels: ["Électronique", "Vêtements", "Maison", "Sport", "Livres"],
    datasets: [
      {
        data: [300, 250, 200, 150, 100],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" ,
      },
    },
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Métriques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Revenus totaux</p>
                <p className="text-3xl font-bold">€45,231.89</p>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+20.1%</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Commandes</p>
                <p className="text-3xl font-bold">+2,350</p>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+180.1%</span>
                </div>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <ShoppingCart className="h-8 w-8 text-success" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Clients actifs</p>
                <p className="text-3xl font-bold">+12,234</p>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+19%</span>
                </div>
              </div>
              <div className="p-3 bg-info/10 rounded-full">
                <Users className="h-8 w-8 text-info" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Produits vendus</p>
                <p className="text-3xl font-bold">573</p>
                <div className="flex items-center gap-1 text-error">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm">-2%</span>
                </div>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <Package className="h-8 w-8 text-warning" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Graphiques */}
      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Évolution des ventes</h2>
            <p className="text-sm opacity-70">Ventes mensuelles en euros</p>
            <div className="h-[300px] mt-4">
              <Bar data={salesData} options={chartOptions} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Répartition par catégorie</h2>
            <p className="text-sm opacity-70">Ventes par catégorie</p>
            <div className="h-[300px] mt-4">
              <Doughnut data={categoryData} options={chartOptions} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Commandes par jour</h2>
          <p className="text-sm opacity-70">Nombre de commandes cette semaine</p>
          <div className="h-[300px] mt-4">
            <Line data={ordersData} options={chartOptions} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
