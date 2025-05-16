import { motion } from "framer-motion"

 const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

const Metric = ({title, value, pourcentage, Trending ,Icon, color}) =>{
    const ColorTrending = Trending.render.displayName === "TrendingUp" ? "text-success" : "text-error"
  return <motion.div variants={itemVariants}
           whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-base-100 shadow-xl hover:shadow-xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">{title}</p>
                <p className="text-3xl font-bold">€{value}</p>
                <div className={`flex items-center gap-1 
                    ${ColorTrending}`}>
                  <Trending className="h-4 w-4" />
                  <span className="text-sm">+{pourcentage}%</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Icon className={`h-8 w-8 text-${color}`} />
              </div>
            </div>
          </div>
        </motion.div>
}

export default Metric;