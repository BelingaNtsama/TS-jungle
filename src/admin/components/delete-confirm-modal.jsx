import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Loader2 } from "lucide-react"

export function DeleteConfirmModal({ isOpen, onClose, product, onDelete }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    try {
      // Simulation d'une API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onDelete(product.id)
      onClose()

      // Simulation d'une notification de succès
      console.log(`Produit ${product.name} supprimé avec succès`)
    } catch (error) {
      console.error("Erreur lors de la suppression", error)
    } finally {
      setLoading(false)
    }
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-sm z-50 bg-black/30 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-base-100 rounded-xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-error" strokeWidth={1.5} />
              </div>

              {/* Section Image */}
              <div className="mb-6">
                <div className="mx-auto w-32 h-32 rounded-xl overflow-hidden border-2 border-base-200 bg-base-100 shadow-sm">
                  <img
                    src={product.image || "/placeholder.svg?height=128&width=128"}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform"
                    loading="lazy"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-base-content mb-2">Supprimer {product.name} ?</h2>
              <p className="text-base-content/70">Ce produit sera définitivement supprimé du système</p>
            </div>

            <div className="space-y-4">
              <div className="bg-base-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-left">
                    <p className="text-base-content/60">Catégorie</p>
                    <p className="font-medium text-primary">{product.category}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-base-content/60">Stock actuel</p>
                    <p className="font-medium text-primary">{product.stock} unités</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-base-300">
                  <div className="text-left">
                    <p className="text-base-content/60">Prix</p>
                    <p className="font-medium text-primary">€{product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={onClose} disabled={loading} className="flex-1 btn btn-outline">
                  Annuler
                </button>
                <button onClick={handleDelete} disabled={loading} className="flex-1 btn btn-error text-error-content">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Confirmer
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
