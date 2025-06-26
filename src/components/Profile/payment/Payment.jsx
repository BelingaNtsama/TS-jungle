// src/components/payments/Payment.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, Plus } from "lucide-react";
import usePaymentStore from "@/stores/paymentStore";
import usePanierStore from "@/stores/panierStore";
import PaymentMethodModal from "@/components/Profile/payment/PaymentMethodModal";
import PaymentMethodCard from "@/components/Profile/payment/PaymentMethodCard";
import { getBrandIcon } from "@/utils/constants";

// Composant principal pour gérer le paiement
export function Payment({ onSuccess, onCancel }) {
  const [showModal, setShowModal] = useState(false);
  const { cartItems } = usePanierStore();
  const {
    paymentMethods,
    selectedMethod,
    isLoading,
    isProcessing,
    error,
    paymentSuccess,
    loadPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    processPayment,
    selectPaymentMethod,
    reset,
  } = usePaymentStore();

  const totalAmount = cartItems.reduce((total, item) => total + item.plant.price * item.quantity, 0);

  useEffect(() => {
    loadPaymentMethods();
    return () => reset();
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await processPayment();
      onSuccess?.();
    } catch (error) {
      console.error("Erreur de paiement:", error);
    }
  };

  const handleAddNewPayment = async (paymentData) => {
    try {
      await addPaymentMethod(paymentData);
    } catch (error) {
      console.error("Échec de l'ajout de la méthode de paiement:", error);
    }
  };

  const handleDeleteMethod = async (methodId) => {
    try {
      await deletePaymentMethod(methodId);
    } catch (error) {
      console.error("Échec de la suppression de la méthode:", error);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Paiement réussi!</h2>
        <p>Votre commande a été passée avec succès.</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto">
      <div className="card-body">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="card-title text-2xl">Détails du paiement</h2>
          <div className="flex items-center text-success gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm">Paiement sécurisé</span>
          </div>
        </div>

        {/* Montant total */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-base-content/70 text-lg">Montant à payer</span>
            <span className="text-3xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Méthodes de paiement */}
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Méthodes de paiement</h3>
              <button 
                type="button" 
                onClick={() => setShowModal(true)} 
                className="btn btn-outline btn-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un moyen de paiement
              </button>
            </div>
            
            <div className="space-y-3 group">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : paymentMethods.length === 0 ? (
                <div className="text-center py-6 text-base-content/60">
                  Aucune méthode de paiement enregistrée
                </div>
              ) : (
                paymentMethods.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    isSelected={selectedMethod === method.id}
                    onSelect={selectPaymentMethod}
                    onDelete={handleDeleteMethod}
                  />
                ))
              )}
            </div>
          </div>

          {/* Méthode sélectionnée */}
          {selectedMethod && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-base-200 rounded-xl p-4"
            >
              <h4 className="font-medium mb-2">Méthode sélectionnée :</h4>
              <div className="flex items-center space-x-3">
                {paymentMethods.find((m) => m.id === selectedMethod)?.type === "card" ? (
                  <>
                    <img
                      src={getBrandIcon(paymentMethods.find((m) => m.id === selectedMethod)?.brand)}
                      alt={paymentMethods.find((m) => m.id === selectedMethod)?.brand}
                      className="h-6 object-contain"
                    />
                    <span>•••• •••• •••• {paymentMethods.find((m) => m.id === selectedMethod)?.last4}</span>
                  </>
                ) : (
                  <>
                    <img src={getBrandIcon("paypal")} alt="PayPal" className="h-5 object-contain" />
                    <span>{paymentMethods.find((m) => m.id === selectedMethod)?.email}</span>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Erreur */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="alert alert-error"
            >
              <span>{error}</span>
            </motion.div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-outline flex-1" 
              disabled={isProcessing}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn btn-primary flex-1" 
              disabled={isProcessing || !selectedMethod}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Traitement...
                </>
              ) : (
                `Payer $${totalAmount.toFixed(2)}`
              )}
            </button>
          </div>
        </form>

        {/* Pied de page */}
        <div className="divider"></div>
        <div className="text-center text-sm text-base-content/70">
          <p className="mb-2">🔒 Vos informations de paiement sont sécurisées et cryptées</p>
          <p>Ceci est un paiement de test. Utilisez 4242 4242 4242 4242 pour les tests.</p>
        </div>

        {/* Modal pour ajouter une nouvelle méthode de paiement */}
        <PaymentMethodModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddNewPayment}
        /> 
      </div>
    </div>
  );
}