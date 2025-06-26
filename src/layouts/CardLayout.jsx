import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from "@/utils/constants"

export default function CardLayout({ title, description, children }) {
  return (
    <motion.div
      className="card bg-base-100 shadow-sm"
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="visible"
    >
      <div className="card-body">
        <motion.h2 className="card-title text-2xl mb-2" variants={ANIMATION_VARIANTS.item}>
          {title}
        </motion.h2>
        {description && (
          <motion.p className="text-base-content/70 mb-6" variants={ANIMATION_VARIANTS.item}>
            {description}
          </motion.p>
        )}
        {children}
      </div>
    </motion.div>
  )
}