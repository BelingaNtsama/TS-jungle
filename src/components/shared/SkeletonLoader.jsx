import { motion } from "framer-motion"

const skeletonVariants = {
  loading: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function SkeletonLoader({ type, count = 1, className = "" }) {
  const renderSkeleton = () => {
    switch (type) {
      case "profile":
        return (
          <motion.div
            className={`card bg-base-100 shadow-lg ${className}`}
            variants={skeletonVariants}
            animate="loading"
          >
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <div className="skeleton w-32 h-32 rounded-full"></div>
                  <div className="skeleton h-8 w-32 mt-4"></div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="skeleton h-8 w-48 mb-2"></div>
                  <div className="skeleton h-6 w-64 mb-4"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="skeleton h-20 w-full rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case "card":
        return (
          <motion.div
            className={`card bg-base-100 shadow-md ${className}`}
            variants={skeletonVariants}
            animate="loading"
          >
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <div className="skeleton w-5 h-5 rounded"></div>
                <div className="skeleton h-6 w-32"></div>
              </div>
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="skeleton w-5 h-5 rounded"></div>
                    <div className="flex-1">
                      <div className="skeleton h-4 w-16 mb-1"></div>
                      <div className="skeleton h-5 w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case "list":
        return (
          <motion.div className={`space-y-4 ${className}`} variants={skeletonVariants} animate="loading">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="skeleton h-6 w-32 mb-2"></div>
                      <div className="skeleton h-4 w-24"></div>
                    </div>
                    <div className="skeleton h-6 w-16"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="skeleton w-16 h-16 rounded"></div>
                        <div>
                          <div className="skeleton h-4 w-24 mb-1"></div>
                          <div className="skeleton h-3 w-16"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <div className="skeleton h-8 w-16"></div>
                    <div className="skeleton h-8 w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )

      case "stats":
        return (
          <motion.div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
            variants={skeletonVariants}
            animate="loading"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-base-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="skeleton w-2 h-2 rounded-full"></div>
                  <div className="skeleton h-4 w-16"></div>
                </div>
                <div className="skeleton h-3 w-20"></div>
              </div>
            ))}
          </motion.div>
        )

      case "text":
        return (
          <motion.div className={`space-y-2 ${className}`} variants={skeletonVariants} animate="loading">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="skeleton h-4 w-full"></div>
            ))}
          </motion.div>
        )

      default:
        return (
          <motion.div className={`skeleton h-20 w-full ${className}`} variants={skeletonVariants} animate="loading" />
        )
    }
  }

  return renderSkeleton()
}
