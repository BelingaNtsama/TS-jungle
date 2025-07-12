import { X } from 'lucide-react';
import PanierStore from '@stores/panierStore';
import CartItem from '@components/Home/shop/CartItem';
import CartHeader from '@components/Home/shop/CartHeader';
import CartAdditionalInfo from '@components//Home/shop/CartAdditionalInfo';
import CartSummary from '@components//Home/shop/CartSummary';
import { PaymentModal } from '@components/Profile/payment/PaymentModal';
import Skeleton from '@components/shared/Skeleton';

import { useState } from 'react';

const ShoppingCart = () => {
  const { isCartOpen, closeCart, cartItems, updateCartItemQuantity, removeFromCart } = PanierStore();
   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0
  );
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <>
      {/* Modal du panier */}
      <div className={`modal modal-end ${isCartOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-2xl p-0 h-screen flex flex-col">
          {/* Bouton pour fermer la modale */}
          <button
            onClick={closeCart}
            className="btn btn-sm btn-circle absolute right-4 top-4 z-50 hover:rotate-90 transition-transform duration-200"
          >
            <X className="h-4 w-4" />
          </button>

          {/* En-tête fixe */}
          <div className="sticky top-0 bg-base-100 z-40 border-b border-base-200">
            <CartHeader itemCount={cartItems.length} />
          </div>

          {/* Zone de défilement pour les articles */}
          <div className="flex-1 overflow-y-auto scrollbar-thin hover:scrollbar-thumb-primary/60 scrollbar-thumb-primary/40 scrollbar-track-base-200 px-6">
            <div className="py-4 space-y-4">
              {cartItems.length === 1 ? (
                <div className="flex justify-center">
                  <Skeleton />
                </div>
              ) : (
                cartItems.map((item) => 
                  item.plant.name === " " ? null : (
                    <div 
                      key={item.plant.id} 
                      className="bg-base-100 rounded-lg transition-all duration-200 hover:shadow-md"
                    >
                      <CartItem
                        plant={item.plant}
                        quantity={item.quantity}
                        onUpdateQuantity={(newQuantity) =>
                          updateCartItemQuantity(item.plant.id, newQuantity)
                        }
                        onRemove={() => removeFromCart(item.plant.id)}
                      />
                    </div>
                  )
                )
              )}
            </div>
          </div>

          {/* Pied de page fixe */}
          <div className="sticky bottom-0 bg-base-100 border-t border-base-200">
            {/* Informations supplémentaires */}
            <CartAdditionalInfo />

            {/* Résumé et bouton de paiement */}
            <CartSummary 
              subtotal={subtotal} 
              shipping={shipping} 
              total={total} 
              setIsPaymentModalOpen={setIsPaymentModalOpen} 
            />
          </div>
        </div>
      </div>
      {/* Modal de paiement */}
      <PaymentModal 
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              amount={total.toFixed(2)}
            />
    </>
  );
};

export default ShoppingCart;