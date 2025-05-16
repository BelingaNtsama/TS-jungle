import { motion } from "framer-motion"
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" ,
      },
    },
  }

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
const Graphic = ({title, Graph, description, data}) =>{
    return  <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl lg:col-span-2">
              <div className="card-body">
                <h2 className="card-title">Évolution des ventes</h2>
                <p className="text-sm opacity-70">Ventes mensuelles en euros</p>
                <div className="h-[300px] mt-4">
                  <Graph data={data} options={chartOptions} />
                </div>
              </div>
            </motion.div>
}

export default Graphic