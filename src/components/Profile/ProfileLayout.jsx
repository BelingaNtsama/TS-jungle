import { useState, lazy, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadindSpinner from '../shared/LoadingSpinner'

// Chargement différé des composants
const ProfileSidebar = lazy(() => import("./Sidebar"))
const ProfileInfo = lazy(() => import("./pages/ProfileInfo"))
const OrderHistory = lazy(() => import("./pages/OrderHistory"))
const AddressManager = lazy(() => import("./pages/AddressManager"))
const PaymentMethods = lazy(() => import("./pages/PaymentMethods"))
const FavoritesList = lazy(() => import("./pages/FavoritesList"))


// Animations
const pageVariants = {
  initial: { opacity: 0, x: 20, scale: 0.98 },
  in: { opacity: 1, x: 0, scale: 1 },
  out: { opacity: 0, x: -20, scale: 1.02 }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState("profil")

  const renderContent = () => {
    const components = {
      profil: <ProfileInfo />,
      commandes: <OrderHistory />,
      adresses: <AddressManager />,
      paiement: <PaymentMethods />,
      favoris: <FavoritesList />
    }

    return components[activeTab] || <ProfileInfo />
  }

  return (
    <motion.div 
      className="min-h-screen bg-base-200 relative top-16" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >

      <motion.div className="container mx-auto p-4" variants={itemVariants}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar avec Suspense */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Suspense fallback={<div className="w-64 h-screen bg-base-100 rounded-lg"></div>}>
              <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </Suspense>
          </motion.div>

          {/* Contenu principal */}
          <motion.main
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Suspense fallback={<LoadindSpinner />}>
                  {renderContent()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </motion.main>
        </div>
      </motion.div>
    </motion.div>
  )
}