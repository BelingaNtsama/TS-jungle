import { motion } from "framer-motion"

 const LoadingSpinner = ({ size = "lg", className = "" }) => {
  return (
    <motion.div className={`flex justify-center items-center min-h-[200px] ${className}`}>
      <motion.span
        className={`loading loading-spinner loading-${size}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    </motion.div>
  )
}

export default LoadingSpinner
