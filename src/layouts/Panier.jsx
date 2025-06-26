import { X } from 'lucide-react';
import PanierStore from '@/stores/panierStore';
import CartItem from '@/components/Home/shop/CartItem';
import CartHeader from '@/components//Home/shop/CartHeader';
import CartAdditionalInfo from '@/components//Home/shop/CartAdditionalInfo';
import CartSummary from '@/components//Home/shop/CartSummary';
import { PaymentModal } from '@/components/Profile/payment/PaymentModal';
import Skeleton from '@/components/shared/Skeleton';

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
      <div className={`modal modal-end overflow-scroll ${isCartOpen ? 'modal-open' : ''}`}>
        <div className="modal-box  max-w-2xl p-0 overflow-y-auto">
          {/* Bouton pour fermer la modale */}
          <button
            onClick={closeCart}
            className="btn btn-sm btn-circle absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Contenu du panier */}
          <div className="flex flex-col overflow-sroll">
            {/* Header */}
            <CartHeader itemCount={cartItems.length} />

            {/* Liste des articles */}
            <div className="flex-1 overflow-y-scroll px-6">
              {cartItems.length===1 ? <div className='flex justify-center'><Skeleton/></div> : cartItems.map((item) => (
                             item.plant.name === " " ? null :
                              <CartItem
                                key={item.plant.id}
                                plant={item.plant}
                                quantity={item.quantity}
                                onUpdateQuantity={(newQuantity) =>
                                  updateCartItemQuantity(item.plant.id, newQuantity)
                                }
                                onRemove={() => removeFromCart(item.plant.id)}
                              />
                            ))}
            </div>

            {/* Informations supplémentaires */}
            <CartAdditionalInfo />

            {/* Résumé et bouton de paiement */}
            <CartSummary subtotal={subtotal} shipping={shipping} total={total} setIsPaymentModalOpen={setIsPaymentModalOpen} />
          </div>
        </div>
      </div>
       <PaymentModal 
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              amount={total.toFixed(2)}
            />
    </>
  );
};

export default ShoppingCart;