// src/components/address/AddAddressButton.jsx
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { ANIMATION_VARIANTS } from "@utils/animations"

export default function AddressButton({ onClick }) {
  return (
    <motion.div
      className="card bg-base-200 border-2 border-dashed border-base-300 hover:border-primary transition-colors"
      variants={ANIMATION_VARIANTS.item}
      whileHover={{
        scale: 1.02,
        borderColor: "hsl(var(--primary))",
      }}
    >
      <div className="card-body items-center text-center justify-center min-h-[200px]">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <Plus className="w-12 h-12 text-base-content/30 mb-4" />
        </motion.div>
        <h3 className="font-semibold mb-2">Ajouter une adresse</h3>
        <p className="text-sm text-base-content/70 mb-4">Ajoutez une nouvelle adresse de livraison</p>
        <motion.button
          className="btn btn-primary"
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ajouter
        </motion.button>
      </div>
    </motion.div>
  )
}