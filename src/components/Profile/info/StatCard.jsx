import { motion } from "framer-motion"

export default function StatCard({ icon, title, value, color, animation }) {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 border-primary/20 text-primary",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20 text-secondary",
    accent: "from-accent/10 to-accent/5 border-accent/20 text-accent",
    warning: "from-warning/10 to-warning/5 border-warning/20 text-warning",
    error: "from-error/10 to-error/5 border-error/20 text-error",
    success: "from-success/10 to-success/5 border-success/20 text-success",
    info: "from-info/10 to-info/5 border-info/20 text-info",
  }

  return (
    <motion.div
      className={`stat bg-gradient-to-br ${colorClasses[color]} rounded-lg p-4 border`}
      variants={animation?.variants}
      whileHover={{ scale: 1.02, y: -2, rotate: animation?.rotate || 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-figure">
        <motion.div animate={animation?.animate} transition={animation?.transition}>
          {icon}
        </motion.div>
      </div>
      <div className="stat-title text-xs">{title}</div>
      <div className={`stat-value text-lg`}>{value}</div>
    </motion.div>
  )
}