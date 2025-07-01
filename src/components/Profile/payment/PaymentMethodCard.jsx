// Composant pour afficher une méthode de paiement
import {motion} from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import { getBrandIcon } from "@utils/constants";

const PaymentMethodCard = ({ method, isSelected, onSelect, onDelete }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        isSelected ? "border-primary bg-primary/5 shadow-lg" : "border-base-300 hover:border-primary/50 hover:shadow-md"
      }`}
      onClick={() => onSelect(method.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {method.type === "card" ? (
            <>
              <div className="w-12 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <img src={getBrandIcon(method.brand)} alt={method.brand} className="h-6 object-contain" />
              </div>
              <div>
                <p className="font-medium text-base-content">•••• •••• •••• {method.last4}</p>
                <p className="text-sm text-base-content/60">Expire {method.exp_month}/{method.exp_year}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <img src={getBrandIcon("paypal")} alt="PayPal" className="h-5 object-contain" />
              </div>
              <div>
                <p className="font-medium text-base-content">PayPal</p>
                <p className="text-sm text-base-content/60">{method.email}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {method.default && <span className="badge badge-primary badge-sm">Défaut</span>}
          {isSelected && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(method.id);
            }}
            className="btn btn-ghost btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PaymentMethodCard;