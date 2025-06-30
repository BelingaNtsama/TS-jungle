// AdminPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, ShoppingCart, Package, Users, Bell } from "lucide-react";
import Dashboard from "@/admin/pages/dashboard";
import Orders from "@/admin/pages/orders";
import Products from "@/admin/pages/products";
import Customers from "@/admin/pages/customers";
import Notifications from "@/admin/components/notifications";
import ProfileSidebar from "@/admin/components/SideBar";
import  useNotificationStore  from "./stores/notificationStore";

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "orders", title: "Commandes", icon: ShoppingCart },
  { id: "products", title: "Produits", icon: Package },
  { id: "customers", title: "Clients", icon: Users },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications } = useNotificationStore();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "orders": return <Orders />;
      case "products": return <Products />;
      case "customers": return <Customers />;
      default: return <Dashboard />;
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={(e) => setSidebarOpen(e.target.checked)}
      />
      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="drawer-content flex flex-col">
        <motion.header className="navbar bg-base-100 border-b border-base-300 px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
              <Menu className="h-6 w-6" />
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold ml-4">
              {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
            </h1>
          </div>
          <div className="flex-none">
            <button
              className="btn btn-ghost btn-circle relative"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-5 w-5" />
              {notifications.filter(n => n.status === 'unread').length > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-content text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {notifications.filter(n => n.status === 'unread').length}
                </span>
              )}
            </button>
          </div>
        </motion.header>
        <main className="flex-1 p-6 bg-base-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Notifications isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </div>
  );
}