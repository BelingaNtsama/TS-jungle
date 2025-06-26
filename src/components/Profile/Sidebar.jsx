import { motion } from "framer-motion";
import { User, Package, MapPin, CreditCard, Heart, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import axiosInstance from "@/services/axiosInstance";
import { toast } from "sonner";

const menuItems = [
  { id: "profil", label: "Informations personnelles", icon: User, shortLabel: "Profil" },
  { id: "commandes", label: "Mes commandes", icon: Package, shortLabel: "Commandes" },
  { id: "adresses", label: "Adresses de livraison", icon: MapPin, shortLabel: "Adresses" },
  { id: "paiement", label: "Moyens de paiement", icon: CreditCard, shortLabel: "Paiement" },
  { id: "favoris", label: "Plantes favorites", icon: Heart, shortLabel: "Favoris" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await axiosInstance.post("/logout");
    toast.success(response.data.message || "Déconnexion réussie");
    setTimeout(() => {
      navigate("/login");
    }, 4000);
    localStorage.clear()
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <aside className="w-full lg:w-64">
      <div className="sticky top-4">
        {/* Mobile Navigation */}
        <motion.div
          className="lg:hidden mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-base-100 rounded-box p-3 shadow-md border border-base-200">
            <motion.div className="grid grid-cols-2 gap-2 mb-2" variants={containerVariants}>
              {menuItems.slice(0, 4).map((item) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  isActive={activeTab === item.id}
                  onClick={() => handleTabChange(item.id)}
                />
              ))}
            </motion.div>
            <MobileMenuItem
              item={menuItems[4]}
              isActive={activeTab === "favoris"}
              onClick={() => handleTabChange("favoris")}
            />
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden lg:block"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="card bg-base-100 shadow-md border border-base-200 rounded-box">
            <div className="card-body p-4">
              <ul className="menu gap-1">
                {menuItems.map((item) => (
                  <DesktopMenuItem
                    key={item.id}
                    item={item}
                    isActive={activeTab === item.id}
                    onClick={() => handleTabChange(item.id)}
                  />
                ))}

                <motion.div
                  className="divider my-1 before:bg-base-200 after:bg-base-200"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                />

                <motion.li variants={itemVariants}>
                  <motion.button
                    className="flex items-center gap-3 text-error hover:bg-error/10 w-full px-4 py-2 rounded-btn"
                    onClick={handleLogout}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Se déconnecter"
                  >
                    <motion.div
                      whileHover={{
                        rotate: 15,
                        scale: 1.2,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                    </motion.div>
                    <span className="text-sm font-medium">Déconnexion</span>
                  </motion.button>
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}

// Mobile Menu Item Component
function MobileMenuItem({ item, isActive, onClick }) {
  return (
    <motion.button
      className={`btn btn-sm gap-2 ${isActive ? "btn-primary" : "btn-ghost"} w-full`}
      onClick={onClick}
      variants={itemVariants}
      whileHover={{
        scale: 1.03,
        y: -2,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
      aria-label={item.label}
    >
      <motion.div
        animate={
          isActive
            ? {
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }
            : {}
        }
        transition={{ duration: 0.5 }}
      >
        <item.icon className="w-4 h-4" />
      </motion.div>
      <span className="text-xs">{item.shortLabel}</span>
    </motion.button>
  );
}

// Desktop Menu Item Component
function DesktopMenuItem({ item, isActive, onClick }) {
  return (
    <motion.li
      variants={itemVariants}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        className={`flex items-center gap-3 ${
          isActive ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"
        } w-full px-4 py-2 rounded-btn`}
        onClick={onClick}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        aria-label={item.label}
      >
        <motion.div
          animate={
            isActive
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.2,
            rotate: 5,
            transition: { duration: 0.2 },
          }}
        >
          <item.icon className="w-5 h-5" />
        </motion.div>
        <span className="text-sm font-medium">{item.label}</span>
      </motion.button>
    </motion.li>
  );
}