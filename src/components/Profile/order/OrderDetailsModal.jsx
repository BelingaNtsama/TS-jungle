// src/components/orders/OrderDetailsModal.jsx
import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { getStatusBadge } from "@/utils/formatters"
import { formatPrice } from "@/utils/formatters"

export default function OrderDetailsModal({ isOpen, onClose, order, onReorder }) {
  if (!order) return null

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-2xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl mb-6">Détails de la commande #{order.id}</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Informations de commande</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Date:</span> {order.date}
                </p>
                <p>
                  <span className="font-medium">Statut:</span>
                  <span className={`ml-2 ${getStatusBadge(order.status)}`}>{order.status}</span>
                </p>
                <p>
                  <span className="font-medium">Total:</span> {formatPrice(order.amount)}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Livraison</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Adresse:</span> 123 Rue des Fleurs
                </p>
                <p>75001 Paris, France</p>
                <p>
                  <span className="font-medium">Transporteur:</span> Colissimo
                </p>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div>
            <h4 className="font-semibold mb-4">Articles commandés</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-base-content/70">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price_at_time_of_order)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Fermer
          </button>
          <button
            className="btn btn-primary gap-2"
            onClick={() => {
              onReorder(order)
              onClose()
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Racheter
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}